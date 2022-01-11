export default class NoteService {
  constructor(baseURL) {
    this.baseURL = baseURL; // 서버에서 response를 가지고 와야한다. fetch를 쓰기엔 코드가 너무 복잡해진다. 그래서 외부로 빼서 쓸수 있도록
  }

  // 함수들을 이용해서 ui들을 가지고 온다.

  // 트윗 출력
  async getNotes(username) {
    let query = username ? `?username=${username}` : ""; // username이 인자로 전달된다면 username이라는 쿼리를 만들고 , 아니라면 빈 문자열로
    const response = await fetch(`${this.baseURL}/notes${query}`, {
      // 외부에서 만든 베이스url을 쓴다.
      method: "GET", // 메소드는 get
      headers: { "Content-Type": "application/json" }, // json형식으로 받아 올것이다.
    });
    const data = await response.json(); // response에 있는것을 json으로 받아오고
    if (response.status !== 200) {
      //만약 status가 200이 아니라면 (성공이 아니라면 )
      throw new Error(data.message); // 에러를 던져준다
    }
    return data; //에러가 이니면 데이터를 리턴해준다.
  }
  // 트윗을 임의로 만든다.
  async postNote(text) {
    const response = await fetch(`${this.baseURL}/notes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 우리의 오브젝트를 json형태로 변환해서 줄 수 있도록
        text,
        username: "yang",
        name: "Yang",
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  }
  // 트윗 삭제
  async deleteNote(noteId) {
    const response = await fetch(`${this.baseURL}/notes/${noteId}`, {
      // 트윗의 아이디를 전달
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.message);
    } // 삭제했으니 따로 데이터를 받아오지 않는다.
  }
  // 트윗 업데이트
  async updateNote(noteId, text) {
    const response = await fetch(`${this.baseURL}/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
