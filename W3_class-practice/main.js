class Person{
    constructor(name,...record){
        this.name=name;
        this.records = record;
    }
    addElement(subject,score){
        this.records.push([subject,score]);
    }
    CreateNewTable(){
        var newEle = document.createElement('table');
        var newEle_caption = document.createElement("caption");
        newEle_caption.textContent=this.name;
        newEle.appendChild(newEle_caption);
        var newEle_thead = document.createElement('thead');
        var newEle_thead_tr = document.createElement('tr');
        var newEle_thead_th1 = document.createElement('th');
        newEle_thead_th1.textContent = 'Subject';
        var newEle_thead_th2 = document.createElement('th');
        newEle_thead_th2.textContent = 'Score';
        newEle_thead_tr.appendChild(newEle_thead_th1);
        newEle_thead_tr.appendChild(newEle_thead_th2);
        newEle_thead.appendChild(newEle_thead_tr);
        newEle.appendChild(newEle_thead);
        var newEle_tbody = document.createElement("tbody");
        newEle.appendChild(newEle_tbody);
        for(var i=0;i<this.records.length;i++){
            var newEle_tr = document.createElement("tr")
            var newEle_td1 = document.createElement("td");
            var newEle_td2 = document.createElement("td");
            console.log(this.records[i]);
            newEle_td1.textContent = this.records[i][0];
            newEle_td2.textContent = this.records[i][1];
            newEle_tr.appendChild(newEle_td1);
            newEle_tr.appendChild(newEle_td2);
            newEle.appendChild(newEle_tr);
        }
        document.body.appendChild(newEle);
    }
}
var ric = new Person('Ric',['Chinese',100],['Math',87]);
ric.CreateNewTable();