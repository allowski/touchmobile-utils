
var model = {
  name: "Base Item",
  price: 10,
  qty: 0,
  min: 0,
  max: 10,
  items: [
    {
     name: "Sub Item 1",
     qty: 0,
     min: 1,
     max: 10,
     price: 5,
     items: []
    },
    {
     name: "Sub Item 2",
     qty: 0,
     price: 5,
     min: 1,
     max: 10,
     items: []
    },
    {
      name: "Group 1",
      qty: 0,
      price: 0,
      min: 1,
      max: 10,
      items: [
        {
          name: "Group Sub Item 1",
          qty: 0,
          price: 4,
          min: 1,
          max: 10,
          items: []
        },
         {
          name: "Group Sub Item 2",
          qty: 0,
          price: 6,
          min: 1, 
          max: 10,
          items: []
        },
      ]
    },
    {
      name: "Group 2",
      qty: 0,
      price: 0,
      min: 1,
      max: 10,
      items: [
        {
          name: "Group 2 Sub Item 1",
          qty: 0,
          price: 4,
          min: 1,
          max: 10,
          items: []
        },
         {
          name: "Group 2 Sub Item 2",
          qty: 0,
          price: 6,
          min: 1,
          max: 10,
          items: []
        },
        {
            name: "Group 3",
            qty: 0,
            price: 0,
            min: 1,
            max: 10,
            items: [
                {
                name: "Group 3 Sub Item 1",
                qty: 0,
                price: 4,
                min: 1,
                max: 10,
                items: []
                },
                {
                name: "Group 3 Sub Item 2",
                qty: 0,
                price: 6,
                min: 1,
                max: 10,
                items: []
                },
            ]
            }
      ]
    }
  ]
};

var Utils = {

    isGroup: function (item){
        return item.items.length > 0;
    },

    traceTree: function (item, groups) {

        if(Array.isArray(item)) return item;

        if(!groups) groups = [];

        if(Utils.isGroup(item)){
            groups.push(item);
            item.items = item.items.filter(subItem => {
                Utils.traceTree(subItem, groups); // repeat recursively
                return !Utils.isGroup(subItem);
            }).map(item => {
                if(isNaN(item.min)){
                    item.min = 0;
                }
                item.qty = item.min;
                return item;
            });
        }


        return groups;
    },

    checkValidity: function (item) {

        groups = Utils.traceTree(item);

        var isValid = false;

        let results = [];

        for(let i = 0; i < groups.length; i++){
            let currentGroup = groups[i];
            console.log("Concat() ", currentGroup.name);
            let count = 0;
            results = results.concat(
                currentGroup.items.map((item) => {
                    if(isNaN(item.qty)) item.qty = 0; 
                    count+=item.qty;
                    let temp = item.qty <= item.max && item.qty >= item.min;
                    console.log(item.name, item.qty, item.max, item.min, temp);
                    return temp;
                })
            );

            console.log("count() -> ", count);
        }
        console.log(results);
        return results.filter(i => i).length > 0;
    },
    calcPrice: function(item) {
        items = Utils.traceTree(item);
    }
};

module.exports = Utils;