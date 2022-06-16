var backendUrl = "http://192.168.3.3:8084"
// var backendUrl = "http://labvm-42-02.itmo-lab.cosm-lab.science:8080"

var app2 = new Vue({
  el: '#container',
  data: {
    team: [],
    teamSave:  {
      name: "",
    },
    humanBeingById: null,
    showModalAdd: false,
    showModalEdit: false,
    showModalId: false,

    teamById: null,
    hiddenId: null,
    posts: [''],
    page: 1,
    perPage: 9,
    pages: [],
    // postsH: [''],
    // pageH: 1,
    // perPageH: 9,
    // pagesH: [],
  },
  methods: {
    showAllTeams: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/team", {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => (this.team = data)); 
    },

    saveTeamToDummy: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/team/saveDummy", {
        method: "POST",
        headers
      })
        .then(response => response.json())
        .then(data => (this.team = data)); 
    },

    saveTeam: function (event) {
      var teamName = prompt("Введите имя команды: ");
      if(teamName == null || teamName.trim() === "") { 
        alert("Имя команды должно быть обязательно заполненым.")
        return; 
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/team/make?teamName=${teamName}`, {
        method: "POST",
        headers
      })
      .then(response => {
        if (!response.ok) throw new Error(response.status);
          return response;
      })
      .then(response => {
        console.log(response)
        this.showAllTeams(null);
      })
      .catch( err => {
        if (this.teamSave.name != null && this.teamSave.name.trim() == ""){ 
          alert("Ошибка! Имя команды не должно быть пустым.");
        }else alert("Попробуй еще раз");
      })
    },

    removeHeroTheTeam: function (event, id) {
      if (confirm("Вы уверены, что хотите удалить эти данные?")) {
        const headers = { "Content-Type": "application/json" };
        fetch(backendUrl + `/${teamId}/remove/${heroId}`, {
          method: "DELETE",
          headers
        })
          .then(response => (this.team = this.team.filter(item => (item.id != id)))); 
        setTimeout(() => alert("Поздравляю! Вы успешно удалили героя из команды."), 30);

      }
    },

    showTeamById: function (event, id) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/team/${id}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.teamById = data;
          this.showModalId = true;
        });
    },

    changeTheMoodSorrow: function (event, id) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/team/${id}`, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => {
          this.humanBeingById = data;
          this.showModalId = true;
        });
    },

    addHeroToTeam: function (event, teamId) {
      let heroId = prompt(`Добавить героя в команду ${this.team.name} по уникальному идентификатору: `)
      if (!/^\+?(0|[1-9]\d*)$/.test(heroId)){
        alert("Ошибка! Вы не ввели число");
        return
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/team/${this.teamById.id}/add/${heroId}`, {
        method: "POST",
        headers
      })
        .then(response => response.json())
        .then(data => alert(`Поздравляю! Герой успешно добавлен в команду.`));
    },

    setPages() {
      let numberOfPages = Math.ceil(this.team.length / this.perPage);
      this.pages = []
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    paginate(team) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return team.slice(from, to);
    }

  },

  computed: {
    displayedTeam() {
      return this.paginate(
        this.team
      );
    },
    
  //   // displayedHero() {
  //   //   return this.paginate(
  //   //   );
  //   // }

  },

  watch: {
    team() {
      this.setPages();
    },
    // humanBeing() {
    //   this.setPages();
    // }
  },

  created() {
    this.showAllTeams();
  }
  
})

