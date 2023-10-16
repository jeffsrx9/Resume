document.addEventListener("alpine:init", () => {
  Alpine.data("xData", () => ({
    init() {
      this.profile = [];
      this.portfolio = [];
      this.skills = [];
      this.finCert = [];
      this.techCert = [];
      this.worksExp = [];
      this.OthersExp = [];
      this.blogs = [];
      this.profileIdx = 0;
      this.portfolioIdx = 1;
      this.skillsFinanceIdx = 1;
      this.skillsFrontEndIdx = 1;
      this.skillsBackEndIdx = 1;
      this.skillsOthersIdx = 1;
      this.blogsIdx = 1;
      this.fetchProfile()
      .then(() => this.fetchPortfolio())
      .then(() => this.fetchSkills())
      .then(() => this.fetchExperience())
        .then(() => {
          this.autoActive();
          this.processIntro();
          document.addEventListener("scroll", () => this.autoActive());
          document.documentElement.style.overflow = "visible";
          document.body.style.overflow = "visible";
          document.getElementById("loading").classList.add("hide");
        });
    },
    autoActive() {
      let current = "";
      this.$el.querySelectorAll("section").forEach((sec) => {
        if (window.pageYOffset >= sec.offsetTop - 60)
          current = sec.getAttribute("id");
      });
      this.$el.querySelectorAll(".navbar-item").forEach((item) => {
        item.classList.remove("active");
        if (item.href.includes(current)) item.classList.add("active");
      });
    },
    fetchProfile() {
      return fetch("./json/porfile.json")
        .then((res) => res.json())
        .then((json) => (this.profile = json));
    },
    fetchPortfolio() {
      return fetch("./json/portfolio.json")
        .then((res) => res.json())
        .then((json) => (this.portfolio = json));
    },
    fetchSkills() {
      return fetch("./json/skills.json")
        .then((res) => res.json())
        .then((json) => (this.skills = json));
    },
    fetchExperience() {
      return fetch("./json/experience.json")
        .then((res) => res.json())
        .then((json) => {
          this.worksExp = json.works;
          this.OthersExp = json.others;
        });
    },
    processIntro() {
      this.worksExp.map((x) => (x.show = false));
      const intro = this.$el.querySelectorAll(".timeline-intro.worksExp");
      const cover = this.$el.querySelectorAll(".timeline-introCover.worksExp");
      intro.forEach((item, idx) => {
        this.worksExp[idx].clientHeight = item.clientHeight + "px";
        cover[idx].style.height = item.clientHeight + "px";
        item.style.height = "3rem";
      });
    },
    toggleIntro(idx) {
      this.worksExp[idx].show = !this.worksExp[idx].show;
      const intro = document.querySelectorAll(".timeline-intro.worksExp");
      const cover = document.querySelectorAll(".timeline-introCover.worksExp");
      const h = this.worksExp[idx].clientHeight;
      if (this.worksExp[idx].show) {
        intro[idx].style.height = h;
        cover[idx].style.transform = "translateY(" + h + ")";
      } else {
        intro[idx].style.height = "2rem";
        cover[idx].style.transform = "none";
      }
    },
  }));
});
