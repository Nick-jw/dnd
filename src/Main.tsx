import { useState, ChangeEvent } from "react";

const Main = (): JSX.Element => {
  const [monsters, setMonsters] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const handleClick = () => {
    setMonsters([...monsters, name]);
    setName("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <p>Monster name:</p>
      <input value={name} onChange={handleInputChange} />
      <button onClick={handleClick}>Add Monster</button>

      <h3>Monsters:</h3>
      <ul>
        {monsters.map((monster): JSX.Element => {
          return <p>{monster}</p>;
        })}
      </ul>
    </>
  );
};

export default Main;
