const SimpleTable = () => {
  return (
    <div className="section">
      <table className="simpletable">
        <tr className="simpletable__title">
          <th className="simpletable__title__field">Players</th>
          <th className="simpletable__title__field"></th>
        </tr>

        {/* loop here to spit out data */}
        <tr className="simpletable__row">
          <td className="simpletable__row__field">Thierry</td>
          <td className="simpletable__row__field">#12</td>
        </tr>
        {/* loop here to spit out data */}
      </table>
    </div>
  );
};

export default SimpleTable;
