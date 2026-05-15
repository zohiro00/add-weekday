import * as vscode from 'vscode';
import type { AddWeekdayOptions } from '../types/addWeekday';

export interface ExtensionConfig extends AddWeekdayOptions {
  targetLanguages: string[];
  runOnSave: boolean;
  showStatusBarItem: boolean;
}

export function getConfig(): ExtensionConfig {
  const cfg = vscode.workspace.getConfiguration('addWeekday');
  return {
    format:          cfg.get<string>('format', 'paren-ja'),
    weekdayStyle:    cfg.get<AddWeekdayOptions['weekdayStyle']>('weekdayStyle', null) ?? undefined,
    dateOrder:       cfg.get<'MDY' | 'DMY'>('dateOrder', 'MDY'),
    yearMode:        cfg.get<'current' | 'next' | 'nearest'>('yearMode', 'current'),
    overwrite:       cfg.get<boolean>('overwrite', false),
    mdOnly:          cfg.get<boolean>('mdOnly', false),
    targetLanguages: cfg.get<string[]>('targetLanguages', ['markdown', 'plaintext']),
    runOnSave:       cfg.get<boolean>('runOnSave', false),
    showStatusBarItem: cfg.get<boolean>('showStatusBarItem', false),
  };
}
