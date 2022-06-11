var app2 = new Vue({
  el: '#container',
  data: {
    humanBeingById: null,
    humanBeingMax: null,
    humanBeingSave:       {
          name: "",
          coordinates: 
          {
            x: 0,
            y:0
          },
          creationDate: 2022-02-21,
          realHero: true,
          hasToothpick: true,
          impactSpeed: 0,
          weaponType: "PISTOL",
          mood: "SORROW",
          car: {
            name:""
          }
        },
    inputId: null,
    maxImpactSpeed: null,
    inputImpactSpeed: null,
    showModalAdd: false,
    showModalEdit: false,
    showModalId: false,
    item_id: null,
    hiddenId: null,
    posts: [''],
		page: 1,
		perPage: 9,
		pages: [],		
		
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
  methods: {

    showAllElements: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:8080/human", {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => (this.humanBeing = data));
        this.maxElement();
    },

    saveDummy: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:8080/human/saveDummy", {
        method: "POST",
        headers
      })
        .then(response => response.json())
        .then(data => (this.humanBeing = data));
      this.maxElement();
    },

    save: function (event) {
      this.humanBeingSave.coordinates.x
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:8080/human/save", {
        method: "POST",
        headers,
        body : JSON.stringify(this.humanBeingSave)
      })
        .then(response => {
          this.showAllElements(null);
        })   
        alert("Поздравляю! Вы успешно создали элемент.");
    },

    updateElement: function (event) {
      if(confirm("Вы уверены, что хотите обновить эти данные?"))
      {
        const headers = { "Content-Type": "application/json" };
        fetch("http://localhost:8080/human/update", {
          method: "POST",
          headers,
          body : JSON.stringify(this.humanBeingById)
        })
        .then(response=> this.showAllElements());
        this.maxElement();
        alert("Поздравляю! Вы успешно обновили элемент.");
      }
    },

    removeElement: function (event, id) {
      if(confirm("Вы уверены, что хотите удалить эти данные?"))
      {
        const headers = { "Content-Type": "application/json" };
        fetch(`http://localhost:8080/human/${id}`, {
          method: "DELETE",
          headers
        })
          .then(response => (this.humanBeing = this.humanBeing.filter(item => (item.id != id))));
          this.maxElement();
          setTimeout(() => alert("Поздравляю! Вы успешно удалили элемент."), 30) ;
        
      }
    },

    showById: function (event, id) {
      const headers = { "Content-Type": "application/json" };
      fetch(`http://localhost:8080/human/${id}`, {
        method: "GET",
        headers
      })
        // .then(response => console.log(response))
        .then(response => response.json())
        .then(data => {
            // console.log (data);
            this.humanBeingById = data;
            // console.log (humanBeingById);
            this.showModalId = true;
            // console.log (showModalId);
          });
    },

    getElement: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(`http://localhost:8080/human/${this.inputId}`, {
        method: "GET",
        headers
      })
        // .then(response => console.log(response))
        .then(response => response.json())
        .then(data => {
          this.humanBeing = [];
          return data;
        })
        .then(data => (this.humanBeing.push(data)));
    },

    maxElement: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(`http://localhost:8080/human/fastest`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(max => {
          this.humanBeingMax = max;
        });
    },

    quantityElement: function (even) {
      let inputImpactSpeed = prompt("impactSpeed: ")
      const headers = { "Content-Type": "application/json" };
      fetch(`http://localhost:8080/human/biggersThan?impactSpeed=${inputImpactSpeed}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => alert(`Найдено ${data.length} элементов impactSpeed которых больше чем ${inputImpactSpeed}`));
    },

    maxMoreElement: function (event) {
      if(confirm("Вы уверены, что хотите удалить эти данные?"))
      {
        let inputImpactSpeed = prompt("impactSpeed: ")
        const headers = { "Content-Type": "application/json" };
        fetch(`http://localhost:8080/human/biggersThan?impactSpeed=${inputImpactSpeed}`, {
          method: "GET",
          headers
        })
          .then(response => response.json())
          .then(data => (this.humanBeing = data));
          alert("Поздравляю! Вы успешно удалили элемент.");
      }
    },

		setPages () {
			let numberOfPages = Math.ceil(this.humanBeing.length / this.perPage);
      this.pages = []
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},

		paginate (humanBeing) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
      // console.log(from, to)
			return humanBeing.slice(from, to);
		}

  },

  computed: {
		displayedHumanBeing () {
			return this.paginate(this.humanBeing);
		}
	},

	watch: {
		humanBeing() {
			this.setPages();
		}
	},

	created(){
    this.showAllElements();
	},

	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}

})

