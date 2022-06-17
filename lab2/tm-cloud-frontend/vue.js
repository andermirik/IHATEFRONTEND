var backendUrl = "http://labvm-42-02.itmo-lab.cosm-lab.science:9093"
// var backendUrl = "http://192.168.3.3:8084"
// var backendUrl = "http://labvm-42-02.itmo-lab.cosm-lab.science:8080"

var app2 = new Vue({
  el: '#container',
  data: {
    team: [],
    teamById: null,
    teamSave:  {
      name: "",
    },
    hero: [],
    showModalEdit: false,
    showModalId: false,
    hiddenId: null,
    posts: [''],
    page: 1,
    perPage: 9,
    pages: [],

    postsH: [''],
    pageH: 1,
    perPageH: 9,
    pagesH: [],
  },
  methods: {
    
    findAll: function (event) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + "/team", {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(data => (this.team = data)); 
    },

    makeTeam: function (event) {
      var teamName = prompt("Введите имя команды: ");
      if(teamName == null){
        return; 
      }
      if(teamName.trim() === "") { 
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
        this.findAll(null);
      })
      .catch( err => {
        alert("Попробуй еще раз");
      })
    },

    removeHeroFromTeam: function (event) {
      if (confirm("Вы уверены, что хотите удалить эти данные?")) {
        const headers = { "Content-Type": "application/json" };
        fetch(backendUrl + `/team/${this.teamById.id}/remove/${heroId}`, {
          method: "DELETE",
          headers
        })
          .then(response => (this.team = this.team.filter(item => (item.id != id)))); 
          setTimeout(() => alert("Поздравляю! Вы успешно удалили героя из команды."), 30);
      }
    },

    addHeroToTeam: function (event) {
      let heroId = prompt(`Добавить героя в команду ${this.teamById.name} по уникальному идентификатору: `)
      if (!/^\+?(0|[1-9]\d*)$/.test(heroId)){
        alert("Ошибка! Вы не ввели число");
        return;
      }
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/team/${this.teamById.id}/add/${heroId}`, {
        method: "POST",
        headers
      })
      .then(response => {
        if(!response.ok) {
          return response.text().then(text => { throw new Error(text) })
         }
        else {
         return response.json();
      }})
        .then(data => alert(`Поздравляю! Герой успешно добавлен в команду.`))
        .catch(err => {
         alert('Ошибка! ' + ("" + err).slice(7));
       });
       this.findAll(null);
    },

    findById: function (event, id) {
      console.log(id)
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

    makeDepressive: function (event, teamId) {
      const headers = { "Content-Type": "application/json" };
      fetch(backendUrl + `/${teamId}/make-depressive`, {
        method: "POST",
        headers,
        body: JSON.stringify(this.teamId)
      })
        .then(response => response.json())
        .then(data => {
          this.team = data;
          this.showModalId = true;
        });
    },

    setPages() {
      let numberOfPages = Math.ceil(this.team.length / this.perPage);
      this.pages = []
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    setPages() {
      let numberOfPagesH = Math.ceil(this.hero.length / this.perPageH);
      this.pagesH = []
      for (let index = 1; index <= numberOfPagesH; index++) {
        this.pagesH.push(index);
      }
    },

    paginate(team) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return team.slice(from, to);
    },

    paginateH(hero) {
      let pageH = this.pageH;
      let perPageH = this.perPageH;
      let from = (pageH * perPageH) - perPageH;
      let to = (pageH * perPageH);
      return hero.slice(from, to);
    }

  },

  computed: {
    displayedTeam() {
      return this.paginate(
        this.team
      );
    },
    
    displayedHero() {
      return this.paginateH(
        this.hero
      );
    }

  },

  watch: {
    team() {
      this.setPages();
    },
    hero() {
      this.setPagesH();
    }
  },

  created() {
    this.findAll();
  }
  
})

