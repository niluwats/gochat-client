import "./ChatHistory.css";

export default function ChatHistory(props) {
  const { data, sender } = props;
  return (
    <div className="gridContainer">
      {data.map((item, id) => {
        if (item.from === sender) {
          return (
            <div key={id} className="fromDiv bg-light">
              {item.msg}
            </div>
          );
        } else {
          return (
            <div key={id} className="toDiv bg-primary">
              {item.msg}
            </div>
          );
        }
      })}
    </div>
  );
}
