import "../chord.css";
import { ChordList, ChordType } from "../ChordList";
type replaceType = { org: string; dst: string };

export const Chord = ({
  //一致コード検索
  chordName,
  clef,
}: {
  chordName: string;
  clef: string;
}) => {
  let chordExists = false;
  let matchChord: ChordType = {
    name: "",
    notes: 3,
    lineG: { position: [] },
    lineF: { position: [] },
    accidental: { kind: [] },
  };

  for (const element of ChordList) {
    if (chordName === element.name) chordExists = true;
    if (element.name2) {
      if (chordName === element.name2) chordExists = true;
    }
    if (chordExists) {
      Object.assign(matchChord, element);
      break;
    }
  }

  //入力されたコードが存在していないなら無を返す
  if (!chordExists) return <div></div>;
  //存在している場合はdiv内容を作成する関数にコード情報を渡す
  return createNoteDivContent({ matchChord, clef });
};

const createNoteDivContent = ({
  matchChord,
  clef,
}: {
  matchChord: ChordType;
  clef: string;
}) => {
  let lineFlg = false;
  let lineArray: boolean[] = [];
  let lineArraySize = 0;
  let accidentalArraySize = 0;
  let chordClef = "g";
  let cssClassChordName = "";
  let replaceClassName: replaceType[] = [
    //クラス名置換用
    { org: "♭", dst: "f" },
    { org: "♯", dst: "s" },
  ];
  let noteArray = []; //出力div配列

  //コード名に♭と♯がある場合CSS用に'f'と's'に置換
  cssClassChordName = matchChord.name;
  for (const element of replaceClassName) {
    if (matchChord.name.match(element.org)) {
      cssClassChordName = matchChord.name.replace(
        new RegExp(element.org + "(.*?)", "g"),
        element.dst
      );
      break;
    }
  }

  //追加の線ト音へ音どちらを使用するか設定
  if (clef === "𝄞") {
    if (matchChord.lineG) {
      lineFlg = true;
      lineArray = matchChord.lineG.position;
    }
  } else {
    chordClef = "f";
    if (matchChord.lineF) {
      lineFlg = true;
      lineArray = matchChord.lineF.position;
    }
  }

  //毎回.lengthしない用
  if (typeof matchChord.accidental !== "undefined")
    accidentalArraySize = matchChord.accidental.kind.length;
  if (lineArray) lineArraySize = lineArray.length;

  //表示順(線->記号->音符)でdiv追加
  for (let i = 1; i < matchChord.notes + 1; i++) {
    //線
    if (lineFlg) {
      //配列が存在+iの位置がtrue
      if (0 < lineArraySize && lineArray[i - 1] === true) {
        //へ音で5本線より上に線を追加する場合、位置調整が必要なのでCSSのクラス名を別に設定する
        if (1 < i && clef === "𝄢") chordClef = "f";
        let lineName =
          "line " +
          cssClassChordName +
          "-" +
          chordClef +
          "-" +
          String(i) +
          "-l";
        noteArray.push(<div className={lineName}>-</div>);
        //最初の要素以外ト音へ音の音や記号の相対位置は基本的に同じ
        if (i === 1) chordClef = "g";
      }
    }

    //ト音の1番目または2番目に線が来る場合へ音の位置設定を別に行う必要がある(rootがBまたはB♭の場合)
    if (matchChord.lineG) {
      if (
        (matchChord.lineG.position[1] === true ||
          matchChord.lineG.position[2] === true) &&
        clef === "𝄢"
      )
        chordClef = "f";
    }

    //記号
    if (
      accidentalArraySize !== 0 &&
      typeof matchChord.accidental !== "undefined"
    ) {
      //参照箇所が配列サイズを超えていない
      if (i - 1 < accidentalArraySize) {
        let accidental = "";
        let lineName = "";
        //配列内容に合わせて♯か♭か決定
        switch (matchChord.accidental.kind[i - 1]) {
          case 0: //符号なし
            break;
          case 1: //♯
            accidental = "♯";
            lineName =
              "sharp " +
              cssClassChordName +
              "-" +
              chordClef +
              "-" +
              String(i) +
              "-s";
            noteArray.push(<div className={lineName}>{accidental}</div>);
            //最初の要素以外ト音へ音の音や記号の相対位置は基本的に同じ
            if (i === 1) chordClef = "g";
            break;
          case 2: //♭
            accidental = "♭";
            lineName =
              "flat " +
              cssClassChordName +
              "-" +
              chordClef +
              "-" +
              String(i) +
              "-f";
            noteArray.push(<div className={lineName}>{accidental}</div>);
            //最初の要素以外ト音へ音の音や記号の相対位置は基本的に同じ
            if (i === 1) chordClef = "g";
            break;
        }
      }
    }

    //音符
    let cName = "note " + cssClassChordName + "-" + chordClef + "-" + String(i);
    noteArray.push(<div className={cName}>𝅝</div>);
    //最初の要素以外ト音へ音の音や記号の相対位置は基本的に同じ
    if (i === 1) chordClef = "g";
  }

  return divJoin(noteArray);
};

//divを結合して返す
const divJoin = (divArray: object[]) => {
  let joinedDiv;
  switch (divArray.length) {
    case 3:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
        </div>
      );
      break;
    case 4:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
        </div>
      );
      break;
    case 5:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
        </div>
      );
      break;
    case 6:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
          {divArray[5]}
        </div>
      );
      break;
    case 7:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
          {divArray[5]}
          {divArray[6]}
        </div>
      );
      break;
    case 8:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
          {divArray[5]}
          {divArray[6]}
          {divArray[7]}
        </div>
      );
      break;
    case 9:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
          {divArray[5]}
          {divArray[6]}
          {divArray[7]}
          {divArray[8]}
        </div>
      );
      break;
    case 10:
      joinedDiv = (
        <div>
          {divArray[0]}
          {divArray[1]}
          {divArray[2]}
          {divArray[3]}
          {divArray[4]}
          {divArray[5]}
          {divArray[6]}
          {divArray[7]}
          {divArray[8]}
          {divArray[9]}
        </div>
      );
      break;
    default:
      joinedDiv = <div>default</div>;
      break;
  }
  return <div className="chord">{joinedDiv}</div>;
};
