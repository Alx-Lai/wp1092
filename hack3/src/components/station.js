import React from 'react'

function Station(props) {
  const data = props.info;
  let num = props.i;
  let len = props.len
  //console.log(num)
  let color = data.station_type
  if(color == 'O'){
    color = 'orange'
  }else if(color == 'R'){
    color = 'red'
  }else if(color == 'G'){
    color = 'green'
  }else if(color == 'B'){
    color = 'blue'
  }
  let line = 'line '
  let end = ''
  if(num == 0 || num == len-1){
    end = ' end'
  }
  if(num == len-1){
    line = ''
  }
  function handleClick(name,address,counter,bike){
    document.getElementById('table-station_name-value').textContent = name;
    document.getElementById('table-address-value').textContent = address;
    document.getElementById('table-service_counter-value').textContent = counter;
    document.getElementById('table-enable_bicycle-value').textContent = bike;
  }
  return (
    <div className="station-line-container">
      <div className="station-and-name" id={'s-'+data.station_id} onClick={()=>{handleClick(data.station_name,data.address,data.service_counter,data.enable_bicycle)}}> {/* you should add both id and onClick to attributes */}
        <div className={"station-rectangle " + color+end}>{data.station_id}</div>
        <div className="station-name">{data.station_name}</div>
      </div>
      <div className={line+color} id={'l-'+data.station_id}></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
