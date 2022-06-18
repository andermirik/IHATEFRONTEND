//var backendUrl = "http://localhost:8080"
var backendUrl = "http://labvm-42-02.itmo-lab.cosm-lab.science:8080"

var app2 = new Vue({
  el: '#container',
  data: {
    humanBeing: [],
    humanBeingById: null,
    humanBeingMax: null,
    humanBeingSave: {
      name: "",
      coordinates:
      {
        x: 0,
        y: 0
      },
      creationDate: 2022 - 02 - 21,
      realHero: true,
      hasToothpick: true,
      impactSpeed: 0,
      weaponType: "PISTOL",
      mood: "SORROW",
      car: {
        name: ""
      }
    },
    inputId: null,
    maxImpactSpeed: null,
    inputImpactSpeed: null,
    showModalAdd: false,
    showModalEdit: false,
    showModalId: false,
    itemId: null,
    hiddenId: null,
    posts: [''],
    page: 1,
    perPage: 9,
    pages: [],
    search: "",
    sortByName: 0, //0 No 1 Asc -1 desc
    sortByWeaponType: 0,
    sortByImpactSpeed: 0,
  },
  methods: {

    isPresent: function (value) {
      return (value != undefined && value != null);
    },

    applyFilter: function (list) {
      search = this.search.trim().toLowerCase();
      if (search == "") return list;
      return list
        .filter(item =>
          (this.isPresent(item.name) && item.name.toString().toLowerCase().includes(search))
          || (this.isPresent(item.weaponType) && item.weaponType.toString().toLowerCase().includes(search))
          || (this.isPresent(item.mood) && item.mood.toString().toLowerCase().includes(search))
          || (this.isPresent(item.car) && this.isPresent(item.car.name) && item.car.name.toString().toLowerCase().includes(search))
          || (this.isPresent(item.impactSpeed) && item.impactSpeed.toString().toLowerCase().includes(search))
        )
    },

    applySort: function (list) {
      var copyList = [...list]

      if (this.sortByName != 0) {
        if (this.sortByName == 1) {
          copyList.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (this.sortByName == -1) {
          copyList.sort((b, a) => a.name.localeCompare(b.name))
        }
      }

      if (this.sortByWeaponType != 0) {
        if (this.sortByWeaponType == 1) {
          copyList.sort((a, b) => a.weaponType.localeCompare(b.weaponType))
        }
        if (this.sortByWeaponType == -1) {
          copyList.sort((b, a) => a.weaponType.localeCompare(b.weaponType))
        }
      }

      if (this.sortByImpactSpeed != 0) {
        if (this.sortByImpactSpeed == 1) {
          copyList.sort((a, b) => a.impactSpeed - b.impactSpeed)
        }
        if (this.sortByImpactSpeed == -1) {
          copyList.sort((b, a) => a.impactSpeed - b.impactSpeed)
        }
      }

      return copyList;
    },

    sortBy: function (field) {
      if (field == 'name') {
        this.sortByImpactSpeed = 0;
        this.sortByWeaponType = 0;
        this.sortByName++;
        if (this.sortByName == 2) {
          this.sortByName = -1;
        }
      }
      if (field == 'weaponType') {
        this.sortByImpactSpeed = 0;
        this.sortByName = 0;
        this.sortByWeaponType++;
        if (this.sortByWeaponType == 2) {
          this.sortByWeaponType = -1;
        }
      }
      if (field == 'impactSpeed') {
        this.sortByWeaponType = 0;
        this.sortByName = 0;
        this.sortByImpactSpeed++;
        if (this.sortByImpactSpeed == 2) {
          this.sortByImpactSpeed = -1;
        }
      }
    },

    showAllHumanBeings: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/human", {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => (this.humanBeing = data));
      this.maxElement();
    },

    saveHumanBeingToDummy: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/human/saveDummy", {
        method: "POST",
        headers
      })
        .then(response => response.json())
        .then(data => (this.humanBeing = data));
        this.maxElement();
    },

    saveHumanBeing: function (event) {
      if (this.humanBeingSave.impactSpeed === "") {
        this.humanBeingSave.impactSpeed = 0;
      }
      if (this.humanBeingSave.coordinates.x === "") {
        this.humanBeingSave.coordinates.x = 0;
      }
      if (this.humanBeingSave.coordinates.y === "") {
        this.humanBeingSave.coordinates.y = 0;
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/human/save", {
        method: "POST",
        headers,
        body: JSON.stringify(this.humanBeingSave)
      })
        .then(response => {
          if (!response.ok) throw new Error(response.status);
          return response;
        })
        .then(response => {
          console.log(response)
          alert("Поздравляю! Вы успешно сохранили информацию о человеке.");
          this.showAllHumanBeings(null);
          this.showModalAdd = false;
        })
        .catch(err => {
          console.log(err)
          if (this.humanBeingSave.name != null && this.humanBeingSave.name.trim() == "") {
            alert("Ошибка! Имя не должно быть пустым.");
          } else if (this.humanBeingSave.impactSpeed != null && this.humanBeingSave.impactSpeed > 759 && this.humanBeingById.impactSpeed < 0) {
            alert("Ошибка! Скорость удара не должна быть меньше 0 и не должна превышать 759.");
          } else alert("Попробуй еще раз");
        })
    },

    updateHumanBeing: function (event) {
      if (this.humanBeingSave.impactSpeed === "") {
        this.humanBeingSave.impactSpeed = 0;
      }
      if (this.humanBeingSave.coordinates.x === "") {
        this.humanBeingSave.coordinates.x = 0;
      }
      if (this.humanBeingSave.coordinates.y === "") {
        this.humanBeingSave.coordinates.y = 0;
      }
      if (confirm("Вы уверены, что хотите обновить эти данные?")) {
        const headers = { "Content-Type": "application/json" };
        fetch(backendUrl + "/human/update", {
          method: "POST",
          headers,
          body: JSON.stringify(this.humanBeingById)
        })
          .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response;
          })
          .then(response => {
            this.showAllHumanBeings();
            alert("Поздравляю! Вы успешно обновили информацию о человеке.");
            this.showModalEdit = false;
          })
          .catch(err => {
            console.log(err)
            if (this.humanBeingById.name != null && this.humanBeingById.name.trim() == "") {
              alert("Ошибка! Имя не должно быть пустым.");
            } else if (this.humanBeingById.impactSpeed != null && this.humanBeingById.impactSpeed > 759 && this.humanBeingById.impactSpeed < 0) {
              alert("Ошибка! Скорость удара не должна быть меньше 0 и не должна превышать 759");
            } else alert("Попробуй еще раз");
          })
      }

    },

    removeHumanBeing: function (event, id) {
      if (confirm("Вы уверены, что хотите удалить эти данные?")) {
        const headers = { "Content-Type": "application/json" };
        fetch(backendUrl + `/human/${id}`, {
          method: "DELETE",
          headers
        })
          .then(response => (this.humanBeing = this.humanBeing.filter(item => (item.id != id))));
        this.maxElement();
        setTimeout(() => alert("Поздравляю! Вы успешно удалили информацию о человеке."), 30);

      }
    },

    showHumanBeingById: function (event, id) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/human/${id}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => {
          this.humanBeingById = data;
          this.showModalId = true;
        });
    },

    maxElement: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/human/fastest`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(max => {
          this.humanBeingMax = max;
        });
    },

    numberOfHumanBeinges: function (event) {
      let inputImpactSpeed = prompt("Скорость удара: ")
      if (!/^\+?(0|[1-9]\d*)$/.test(inputImpactSpeed)){
        alert("Ошибка! Вы не ввели число");
        return
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/human/biggersThan?impactSpeed=${inputImpactSpeed}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => alert(`Найдено ${data.length} элементов, у которых скороть удара больше чем ${inputImpactSpeed}`));
    },

    maxNumberOfHumanBeinges: function (event) {
      let inputImpactSpeed = prompt("Скорость удара: ")
      if (!/^\+?(0|[1-9]\d*)$/.test(inputImpactSpeed)){
        alert("Ошибка! Вы не ввели число");
        return
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/human/biggersThan?impactSpeed=${inputImpactSpeed}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => (this.humanBeing = data));
      alert("Поздравляю! Вы успешно вернули массив объектов impactSpeed, который больше заданного.");
    },

    setPages() {
      let numberOfPages = Math.ceil(this.humanBeing.length / this.perPage);
      this.pages = []
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    paginate(humanBeing) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return humanBeing.slice(from, to);
    }

  },

  computed: {
    displayedHumanBeing() {
      return this.paginate(

        this.applyFilter(
          this.applySort(
            this.humanBeing
          )
        )
      );
    }
  },

  watch: {
    humanBeing() {
      this.setPages();
    }
  },

  created() {
    this.showAllHumanBeings();
  },

  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + '...';
    },
  }

})

