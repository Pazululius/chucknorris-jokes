import { useEffect, useState } from "react";
import "./App.css";
import chuck from "../src/assets/chucknorris.gif";

type Joke = {
  id: string;
  value: string;
};

function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchJokes = async () => {
    const fetchedJokes: Joke[] = [];
    for (let i = 0; i < 3; i++) {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const joke: Joke = await response.json();
      fetchedJokes.push(joke);
    }
    setJokes(fetchedJokes);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const filteredJokes = jokes.filter((joke) =>
    joke.value.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "20px",
        width: "1200px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ color: "black" }}>Chuck Norris Jokes </h1>
        <img
          src={chuck}
          alt="Chuck Norris Logo"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
      </div>
      <div style={{ display: "flex", columnGap: "5px" }}>
        <input
          type="text"
          placeholder="Filter jokes..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            marginBottom: "10px",
            borderRadius: "20px",
            padding: "5px",
            width: "100%",
            backgroundColor: "#f9f9f9",
          }}
        />
        <button
          style={{
            backgroundColor: "#4CAF50",
            height: "30px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            border: "1px transparent",
            width: "15%",
          }}
          onClick={fetchJokes}
        >
          refresh jokes
        </button>
      </div>
      <div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#f9f9f9",
            color: "black",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Joke
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJokes.map((joke) => (
              <tr
                key={joke.id}
                style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {joke.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {joke.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
