var app2 = new Vue({
    el: '#container',
    data: {
        humanBeing: [
        // {
        //     name: "Dima",
        //     coordinates: 2.353,
        //     creationDate: 2022-02-21,
        //     realHero: "True",
        //     hasToothpick: "True",
        //     impactSpeed: 14.543,
        //     weaponType: "PISTOL",
        //     mood: "SORROW",
        //     car: "Mitsubishi"
        //   }, {
        //     name: "Andrew",
        //     coordinates: 18.953,
        //     creationDate: 2022-02-21,
        //     realHero: "False",
        //     hasToothpick: "True",
        //     impactSpeed: 8.762,
        //     weaponType: "HAMMER",
        //     mood: "LONGING",
        //     car: "Mersedes"
        //   }, {
        //     name: "Mark",
        //     coordinates: 14.199,
        //     creationDate: 2022-02-21,
        //     realHero: "False",
        //     hasToothpick: "True",
        //     impactSpeed: 5.325,
        //     weaponType: "SHOTGUN",
        //     mood: "GLOOM",
        //     car: "Lamba"
        //   }, {
        //     name: "David",
        //     coordinates: 27.152,
        //     creationDate: 2022-02-21,
        //     realHero: "True",
        //     hasToothpick: "True",
        //     impactSpeed: 7.624,
        //     weaponType: "KNIFE",
        //     mood: "CALM",
        //     car: "Porshe"
        //   }, {
        //     name: "Yura",
        //     coordinates: 42.288,
        //     creationDate: 2022-02-21,
        //     realHero: "True",
        //     hasToothpick: "True",
        //     impactSpeed: 12.747,
        //     weaponType: "PISTOL",
        //     mood: "FRENZY",
        //     car: "Lada"
        //   }, {
        //     name: "Maks",
        //     coordinates: 31.741,
        //     creationDate: 2022-02-21,
        //     realHero: "False",
        //     hasToothpick: "True",
        //     impactSpeed: 10.356,
        //     weaponType: "KNIFE",
        //     mood: "SORROW",
        //     car: "Lexus"
        //   }, {
        //     name: "Ilya",
        //     coordinates: 82.742,
        //     creationDate: 2022-02-21,
        //     realHero: "True",
        //     hasToothpick: "True",
        //     impactSpeed: 10.373,
        //     weaponType: "SHOTGUN",
        //     mood: "LONGING",
        //     car: "Audi"
        //   }
        ]
    },
    created() {
        // GET request using fetch with set headers
        const headers = { "Content-Type": "application/json" };
        axios.post("http://localhost:8081/human/saveDummy", null, { headers })
          .then(response => response.data)
          .then(data => (this.humanBeing = data));


          const headers2 = { "Content-Type": "application/json" };
          axios.get("http://localhost:8081/human",) //{ headers2 })
          .then(response => response.data)
          .then(data => (this.humanBeing = data));

        $.ajax({
            url: "http://localhost:8081/human",
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                console.log(res);
                alert(res);
            }
        });
      }
  })

