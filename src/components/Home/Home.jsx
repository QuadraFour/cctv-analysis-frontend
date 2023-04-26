/* eslint-disable react/prop-types */
import "./Home.css";

function Home({ data }) {
  const incident = data;
  function formatDate(date) {
    let formattedDate = new Date(date);
    if (date == "") return "";
  
    return (
      formattedDate.getDate().toString().padStart(2, 0) +
      "/" +
      (formattedDate.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      formattedDate.getFullYear()+'  '+formattedDate.getHours()+":"+formattedDate.getMinutes() +":" + formattedDate.getSeconds().toString().padStart(2, '0')
    );
  }
  const rows = incident.map((el) => (
    <tr key={el._id}>
      <td>{el._id}</td>
      <td style={{textTransform:"uppercase"}}>{el.type}</td>
      <td style={{textTransform:"uppercase"}}>{el.levelOfAlert}</td>
      <td>{el.locality}</td>
      <td>{formatDate(el.time)}</td>
    </tr>
  ));

  return (
    <div>
      <center>
        <h1 style={{ marginTop: "100px" }}>Incident Data</h1>
      </center>
      <table>
        <thead>
          <tr>
            <th>Incident ID</th>
            <th>Incident Type</th>
            <th>Level of alert</th>
            <th>Incident Locality</th>
            <th>Incident Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Home;
