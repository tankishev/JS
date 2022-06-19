function createSortedList(){
    const o = {
        _list : [],
        size : 0,
        add(el) {
            this._list.push(el);
            this.size = this._list.length;
            this._list.sort((a, b) => a - b)
        },
        remove(idx){
            if (0 <= idx && idx < this._list.length){
                this._list.splice(idx, 1);
                this.size = this._list.length;
            }
        },
        get(idx){
            if (0 <= idx && idx < this._list.length){
                return this._list[idx];
            }
        }
    }
    return o;
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
