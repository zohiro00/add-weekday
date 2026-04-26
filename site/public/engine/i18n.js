// i18n.js — translation dictionaries and apply function for add-weekday UI
(function (root) {
  const I18N = {
    ja: {
      // Engine page
      'page.title':                  'add-weekday — 曜日付与ツール',
      'sidebar.title':               'Settings',
      'sidebar.locale.group':        'Locale / Region',
      'sidebar.locale.label':        '言語 / 地域',
      'sidebar.format.group':        'Date Format',
      'sidebar.format.label':        '曜日フォーマット',
      'sidebar.format.desc':         '日付の後に付与する曜日の表記',
      'sidebar.format.template.label': 'カスタムテンプレート',
      'sidebar.format.template.desc':  '{date} と {weekday} を使って自由にフォーマット',
      'sidebar.format.template.placeholder': '{date}({weekday})',
      'sidebar.year.group':          'Year Inference',
      'sidebar.year.label':          '過去日付の年度判定',
      'sidebar.year.desc':           '年が省略され、その日付が既に過ぎている場合の扱い',
      'sidebar.year.current':        '今年 (current)',
      'sidebar.year.next':           '来年 (next)',
      'sidebar.year.nearest':        '最も近い年',
      'sidebar.year.refdate':        '基準日 (Reference Date)',
      'sidebar.behavior.group':      'Behavior',
      'sidebar.behavior.auto.label': '自動変換 (Auto)',
      'sidebar.behavior.auto.desc':  '入力と同時に変換する',
      'sidebar.behavior.overwrite.label': '既存曜日の上書き',
      'sidebar.behavior.overwrite.desc':  '既に曜日付きの日付も再計算する',
      'sidebar.behavior.mdonly.label': 'mm/dd のみ対応',
      'sidebar.behavior.mdonly.desc':  'yyyy/mm/dd はスキップする',
      'sidebar.behavior.highlight.label': '曜日を色分け',
      'sidebar.behavior.highlight.desc':  '変換後に曜日を色で区別する',
      'sidebar.experimental.group':  'Experimental',
      'placeholder.input':           '# 週次レポート\n\n- キックオフ: 4/22\n- レビュー会: 2026/5/1\n- 締切: 12/31\n\n…など、マークダウンに日付を書くと自動で曜日を付与します。',
      'btn.copy.label':              'Click to Copy',
      // LP
      'lp.nav.open':                 'ツールを開く →',
      'lp.hero.title':               '日付テキストに<br><span class="hl">曜日</span>を自動付与',
      'lp.hero.sub':                 'マークダウンや議事録の日付（<code style="font-family:var(--font-mono);color:var(--syntax-date);font-size:14px">4/20</code>）に、曜日を一括で追加します。コピペするだけ、ゼロ設定。',
      'lp.hero.cta':                 'ツールを開く',
      'lp.feature.markdown.name':    'マークダウン対応',
      'lp.feature.markdown.desc':    'テーブル・リスト・本文中など、マークダウン内の日付をまとめて変換。',
      'lp.feature.preview.name':     '即時プレビュー',
      'lp.feature.preview.desc':     '入力しながらリアルタイムで変換結果を確認。Source / Preview の切り替えも可能。',
      'lp.feature.format.name':      '複数フォーマット',
      'lp.feature.format.desc':      '<code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">(月)</code> <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">[月]</code> <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">(Mon)</code> など複数の出力フォーマットを選択可能。',
      'lp.feature.year.name':        '年度推定',
      'lp.feature.year.desc':        '<code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">4/20</code> のような年省略日付は、基準日を元に正しい年を自動推定。',
      'lp.formats.title':            'Format Options',
      'lp.feature.i18n.name':        '多言語対応',
      'lp.feature.i18n.desc':        '日本語 <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">4/20(月)</code>・英語 <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">Mon, 4/20</code>・英国 <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">Mon, 20/4</code> など、ロケール別に自動切り替え。',
      'lp.fmt.default':              'デフォルト',
      'lp.fmt.fullwidth':            '全角括弧',
      'lp.fmt.english':              '英語',
      'lp.fmt.bracket':              '角括弧',
      'lp.fmt.space':                'スペース区切り',
      'lp.fmt.locale-en':            '英語ロケール',
      'lp.cta.text':                 'ブラウザで今すぐ使えます。インストール不要。',
      'lp.cta.btn':                  'ツールを開く',
      'lp.footer.terms':             '利用規約',
      'lp.footer.privacy':           'プライバシーポリシー',
    },
    en: {
      // Engine page
      'page.title':                  'add-weekday — Weekday Annotation Tool',
      'sidebar.title':               'Settings',
      'sidebar.locale.group':        'Locale / Region',
      'sidebar.locale.label':        'Language / Region',
      'sidebar.format.group':        'Date Format',
      'sidebar.format.label':        'Weekday Format',
      'sidebar.format.desc':         'How the weekday is appended to dates',
      'sidebar.format.template.label': 'Custom Template',
      'sidebar.format.template.desc':  'Use {date} and {weekday} as placeholders',
      'sidebar.format.template.placeholder': '{weekday}, {date}',
      'sidebar.year.group':          'Year Inference',
      'sidebar.year.label':          'Year for Past Dates',
      'sidebar.year.desc':           'How to handle dates that have already passed this year',
      'sidebar.year.current':        'This year (current)',
      'sidebar.year.next':           'Next year (next)',
      'sidebar.year.nearest':        'Nearest year',
      'sidebar.year.refdate':        'Reference Date',
      'sidebar.behavior.group':      'Behavior',
      'sidebar.behavior.auto.label': 'Auto Convert',
      'sidebar.behavior.auto.desc':  'Convert as you type',
      'sidebar.behavior.overwrite.label': 'Overwrite Existing',
      'sidebar.behavior.overwrite.desc':  'Re-calculate dates that already have a weekday',
      'sidebar.behavior.mdonly.label': 'mm/dd Only',
      'sidebar.behavior.mdonly.desc':  'Skip yyyy/mm/dd dates',
      'sidebar.behavior.highlight.label': 'Colorize Days',
      'sidebar.behavior.highlight.desc':  'Color-code days of week in output',
      'sidebar.experimental.group':  'Experimental',
      'placeholder.input':           '# Q2 Project Timeline\n\n- Kickoff: 4/22\n- Review: 2026/5/1\n- Deadline: 12/31\n\nPaste any markdown with dates and weekdays are added automatically.',
      'btn.copy.label':              'Click to Copy',
      // LP
      'lp.nav.open':                 'Open Tool →',
      'lp.hero.title':               'Add <span class="hl">Weekdays</span> to<br>Date Text Automatically',
      'lp.hero.sub':                 'Paste markdown or meeting notes with dates like <code style="font-family:var(--font-mono);color:var(--syntax-date);font-size:14px">4/20</code> and weekdays are added in bulk. Zero setup.',
      'lp.hero.cta':                 'Open Tool',
      'lp.feature.markdown.name':    'Markdown Support',
      'lp.feature.markdown.desc':    'Converts dates in tables, lists, and body text — handles full markdown documents.',
      'lp.feature.preview.name':     'Live Preview',
      'lp.feature.preview.desc':     'See results as you type. Toggle between Source and rendered Preview.',
      'lp.feature.format.name':      'Multiple Formats',
      'lp.feature.format.desc':      'Choose from <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">(Mon)</code> <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">[Mon]</code> or custom templates like <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">Mon, 4/20</code>.',
      'lp.feature.year.name':        'Year Inference',
      'lp.feature.year.desc':        'Dates like <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">4/20</code> without a year are resolved to the correct year automatically.',
      'lp.formats.title':            'Format Options',
      'lp.feature.i18n.name':        'Locale Support',
      'lp.feature.i18n.desc':        'Japanese <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">4/20(月)</code>, US English <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">Mon, 4/20</code>, UK English <code style="font-size:11px;font-family:var(--font-mono);color:var(--syntax-string)">Mon, 20/4</code> — switch locale to auto-adjust.',
      'lp.fmt.default':              'default',
      'lp.fmt.fullwidth':            'fullwidth parens',
      'lp.fmt.english':              'English',
      'lp.fmt.bracket':              'bracket',
      'lp.fmt.space':                'space-separated',
      'lp.fmt.locale-en':            'English locale',
      'lp.cta.text':                 'Use it right now in your browser. No install required.',
      'lp.cta.btn':                  'Open Tool',
      'lp.footer.terms':             'Terms',
      'lp.footer.privacy':           'Privacy Policy',
    },
  };

  function getLang(locale) {
    return locale && locale.startsWith('en') ? 'en' : 'ja';
  }

  function applyI18n(locale) {
    const lang = getLang(locale);
    const dict = I18N[lang] || I18N.ja;
    // Plain text replacements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    // HTML replacements (for elements containing inline HTML like <code>, <span>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    const titleKey = 'page.title';
    if (dict[titleKey]) document.title = dict[titleKey];
  }

  root.I18N = I18N;
  root.applyI18n = applyI18n;
  root.getLang = getLang;
}(typeof self !== 'undefined' ? self : this));
