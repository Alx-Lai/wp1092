
const Thead = ({Text_array,toggle,setToggle})=>{
    var alphabets= ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var head_title = [''];
    for(var i=0;i<Text_array[0].length;i++){
        head_title[i+1]=num_to_index(i+1);
    }
    function num_to_index(num){
        var str='',temp_arr=[];
        while(num>26){
            temp_arr.push(num%26);
            num=Math.floor(num/26);
        }
        temp_arr.push(num);
        for(var j=temp_arr.length-1;j>=0;j--){
            str+=alphabets[temp_arr[j]];
        }
        return str;
    }
    function onClickHandle(y){
        var id = y.target.id;
        //console.log(y.target.id);
        if(id =='focused_th'){
            setToggle({x:-2,y:toggle.y,count:0});
        }else{
            var id_p = id.slice(2);
            setToggle({x:-2,y:id_p,count:0});   
        } 
    }
    var head_count = -2;
    return(
        <thead>
            <tr>
                {head_title.map((head_name)=>{
                    head_count++;
                    if(head_count==toggle.y){
                        return (
                        <th id="focused_th" key={head_name} onClick={onClickHandle}>{head_name}</th>
                        )
                    }else{
                        return (
                        <th id={'th'+head_count} key={head_name}  onClick={onClickHandle}>{head_name}</th>
                        )
                    }
                })}
            </tr>
        </thead>
    )
}
export default Thead;