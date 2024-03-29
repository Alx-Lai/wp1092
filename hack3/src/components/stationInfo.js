import React from 'react'

function StationInfo(props) {
  const labels = [
    { label: '車站名稱', value: 'station_name' },
    { label: '車站位址', value: 'address' },
    { label: '詢問處位置', value: 'service_counter' },
    { label: '自行車進出', value: 'enable_bicycle' }
  ]

  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          {
            labels.map(({label,value})=>{
    return (
        <tr>
        <td id ={'table-'+value+'-label'}>{label}</td>
        <td id ={'table-'+value+'-value'}>{value}</td>
        </tr>
    )})
            // generate multiple
            //   <tr>
            //     <td></td>
            //     <td></td>
            //   </tr>
            // coding here ...
          }
        </tbody>
      </table>
    </div>
  )
}

export default StationInfo
