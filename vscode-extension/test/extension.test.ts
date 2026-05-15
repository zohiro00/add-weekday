import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Add Weekday Extension', () => {
  test('command is registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('addWeekday.run'), 'addWeekday.run command must be registered');
  });

  test('converts entire document when no selection', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: 'ミーティング: 5/15\nレビュー: 5/20\n',
      language: 'markdown',
    });
    const editor = await vscode.window.showTextDocument(doc);

    // Ensure no selection
    editor.selection = new vscode.Selection(0, 0, 0, 0);

    await vscode.commands.executeCommand('addWeekday.run');

    const result = doc.getText();
    assert.ok(result.includes('('), 'Document should contain weekday annotation');
    assert.ok(result.includes('5/15'), 'Original date should be present');
  });

  test('converts only selected range', async () => {
    const content = 'キックオフ: 5/15\nリリース: 5/20\n';
    const doc = await vscode.workspace.openTextDocument({ content, language: 'markdown' });
    const editor = await vscode.window.showTextDocument(doc);

    // Select first line only
    const firstLineEnd = doc.lineAt(0).range.end;
    editor.selection = new vscode.Selection(new vscode.Position(0, 0), firstLineEnd);

    await vscode.commands.executeCommand('addWeekday.run');

    const result = doc.getText();
    const lines = result.split('\n');
    assert.ok(lines[0].includes('('), 'First line should have weekday annotation');
    // Second line should be unchanged (no weekday added yet)
    assert.ok(!lines[1].includes('('), 'Second line should not have weekday annotation');
  });
});
