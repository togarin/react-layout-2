import { useEffect, useState } from "react";
import axios from "axios";
import Page from "./components/Page";
const apiUrl = "http://localhost:3001/menu";
const storageKey = "cachedData";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const cachedData = localStorage.getItem(storageKey);
        if (cachedData) {
          const data = JSON.parse(cachedData);
          const validData = validateData(data);
          console.log("Данные получены из кэша");
          setLoading(false);
          setData(validData);
        }
      } catch {}

      try {
        const result = await axios(apiUrl);
        const { data } = result;
        const validData = validateData(data);

        if (validData.length === 0)
          throw new Error("Нет данных для отображения");

        console.log("Данные получены из api и записаны в кэш");
        localStorage.setItem(storageKey, JSON.stringify(validData));
        setData(validData);
        setError(null);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    };
    fetchPageContent();
  }, []);

  const renderAppContent = () => {
    if (loading) return <div>loading</div>;
    if (error) return <div>{error.message}</div>;
    return <Page data={data} />;
  };

  return <div className="App">{renderAppContent()}</div>;
}

export default App;

const validateData = (data) => {
  if (!data) throw new Error("Данные не получены");
  if (!Array.isArray(data)) throw new Error("Данные неверны");
  return data.filter(
    (item) =>
      !!item.id &&
      typeof item.menu_title === "string" &&
      item.menu_title.length > 0 &&
      typeof item.content === "object" &&
      Object.keys(item.content).length > 0
  );
};
