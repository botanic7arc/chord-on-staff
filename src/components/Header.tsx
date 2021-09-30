export const Header = () => {
  return (
    <div className="description">
      <h1>コード五線譜表示</h1>
      <p>コードを入力すると五線譜上に表示します。</p>
      <p> 使用できる文字は半角英数字と"♯"または"#"と"♭"と"-"です。 例:E♭m7-5</p>
      <p>
        音符記号ボタンでト音へ音の切り替えができます。へ音はト音の1オクターブ下です。
      </p>
      <p>対応コードはC, D♭ , D, E♭, E, F, F♯, G, A♭, A, B♭, B系です。
        <a
          href="https://github.com/botanic7arc/chord-on-staff"
          target="_blank"
          rel="noopener noreferrer"
        >
          (対応コード一覧)
        </a>
      </p>
    </div>
  );
};
