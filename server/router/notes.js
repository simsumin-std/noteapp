import express from "express";
import "express-async-errors";

let notes = [
  {
    id: "1",
    text: "소프트웨어 개발실습4 ",
    createdAt: Date.now().toString(),
    name: "Yang",
    username: "yang",
  },
  {
    id: "2",
    text: "안녕!",
    createdAt: Date.now().toString(),
    name: "Lee",
    username: "lee",
  },
];
const router = express.Router();

// GET /notes
// GET /notes?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username; // 만약 유저이름이 req.query에 username으로 있다면 값이 있겠지 없다면 undefine
  const data = username
    ? notes.filter((note) => note.username === username) // 우리가 사용자에게 전달해줘야 하는 username이 있다면 가지고 있는 community에서 필터를 해줘야 겠지.
    : notes;
  res.status(200).json(data);
});

// GET /notes/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id; // id를 받는 방법
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.status(200).json(note); // communityMemo가 있는 경우
  } else {
    res.status(404).json({ message: `Note id(${id}) not found` }); // communityMemo가 없는 경우 json으로 사용자에게 좀 더 차세하게 가르쳐 줌
  }
});

// POST /tweeets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const note = {
    // 유저의 정보를 만듦
    id: Date.now().toString(), // 데이터베이스가 없으므로 유저의 아이디는 시간을 문자열로
    text,
    createdAt: new Date(),
    name,
    username,
  };
  notes = [note, ...notes];
  res.status(201).json(note); //성공적으로 만들었어. json 사용자에게 만들어진 온전한 데이터를 보내줘야 한다.
});

// PUT /notes/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id; // 아이디를 받아와서
  const text = req.body.text;
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.text = text;
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: `Note id(${id}) not found` });
  }
});

// DELETE /notes/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id); //배열을 한번씩 돌면서 필터 해주면 된다. t를 받아와서 t가 삭제하고자 하는 아이디가 아닌 아이들만 다시 묶는다.
  res.sendStatus(204); // 정상적으로 삭제됬고 그 아이디의 리소스는 없다.
});

export default router;
