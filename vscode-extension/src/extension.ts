import * as vscode from 'vscode';
import { runAddWeekday } from './core';
import { getConfig } from './config';

export function activate(context: vscode.ExtensionContext): void {
  // Register main command
  const commandDisposable = vscode.commands.registerCommand('addWeekday.run', () => {
    runCommand();
  });
  context.subscriptions.push(commandDisposable);

  // runOnSave listener
  const saveDisposable = vscode.workspace.onWillSaveTextDocument(event => {
    const cfg = getConfig();
    if (!cfg.runOnSave) return;
    if (!cfg.targetLanguages.includes(event.document.languageId)) return;

    const edit = buildEdit(event.document, cfg);
    if (edit) {
      event.waitUntil(vscode.workspace.applyEdit(edit));
    }
  });
  context.subscriptions.push(saveDisposable);

  // Status bar item
  let statusBarItem: vscode.StatusBarItem | undefined;

  function syncStatusBar(): void {
    const cfg = getConfig();
    if (cfg.showStatusBarItem) {
      if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'addWeekday.run';
        statusBarItem.text = '$(calendar) Add Weekday';
        statusBarItem.tooltip = '曜日を付与 (Add Weekday)';
        context.subscriptions.push(statusBarItem);
      }
      statusBarItem.show();
    } else {
      statusBarItem?.hide();
    }
  }

  syncStatusBar();

  const configChangeDisposable = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('addWeekday.showStatusBarItem')) {
      syncStatusBar();
    }
  });
  context.subscriptions.push(configChangeDisposable);
}

function buildEdit(
  document: vscode.TextDocument,
  cfg: ReturnType<typeof getConfig>,
  range?: vscode.Range,
): vscode.WorkspaceEdit | undefined {
  const targetRange = range ?? new vscode.Range(
    document.positionAt(0),
    document.positionAt(document.getText().length),
  );
  const text = document.getText(targetRange);
  const { text: newText, count } = runAddWeekday(text, {
    format:       cfg.format,
    weekdayStyle: cfg.weekdayStyle,
    dateOrder:    cfg.dateOrder,
    yearMode:     cfg.yearMode,
    overwrite:    cfg.overwrite,
    mdOnly:       cfg.mdOnly,
    refDate:      new Date(),
  });

  if (count === 0) return undefined;

  const edit = new vscode.WorkspaceEdit();
  edit.replace(document.uri, targetRange, newText);
  return edit;
}

function runCommand(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const cfg = getConfig();
  if (!cfg.targetLanguages.includes(editor.document.languageId)) {
    vscode.window.showWarningMessage(
      `Add Weekday: このファイル種別 (${editor.document.languageId}) は対象外です。` +
      ' addWeekday.targetLanguages で追加できます。',
    );
    return;
  }

  const hasSelection = !editor.selection.isEmpty;
  const range = hasSelection ? editor.selection : undefined;
  const { text, count } = runAddWeekday(editor.document.getText(range), {
    format:       cfg.format,
    weekdayStyle: cfg.weekdayStyle,
    dateOrder:    cfg.dateOrder,
    yearMode:     cfg.yearMode,
    overwrite:    cfg.overwrite,
    mdOnly:       cfg.mdOnly,
    refDate:      new Date(),
  });

  if (count === 0) {
    vscode.window.setStatusBarMessage('Add Weekday: 対象の日付が見つかりませんでした', 3000);
    return;
  }

  const targetRange = range ?? new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(editor.document.getText().length),
  );

  const edit = new vscode.WorkspaceEdit();
  edit.replace(editor.document.uri, targetRange, text);
  vscode.workspace.applyEdit(edit).then(() => {
    const scope = hasSelection ? '選択範囲' : 'ドキュメント全体';
    vscode.window.setStatusBarMessage(`Add Weekday: ${count} 件の日付に曜日を付与しました (${scope})`, 4000);
  });
}

export function deactivate(): void {
  // nothing to clean up
}
