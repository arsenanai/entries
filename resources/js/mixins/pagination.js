export default {
  data() {
    return {
      currentPage: 1,
      loading: false,
    };
  },
  watch:{
    '$route': 'fetchPage'
  },
  mounted() {
    this.fetchPage();
  },
  methods: {
    newEntity() {
        this.goTo(`/${this.entity.name}/create`);
    },
    onNext() {
        this.goTo({path:`/${this.entity.name}`, query:{page: this.currentPage+=1}});
    },
    onPrev() {
        this.goTo({path:`/${this.entity.name}`, query:{page: this.currentPage-=1}});
    },
    onEdit(data) {
        this.goTo({path:`/${this.entity.name}/edit/${data.id}`, data});
    },
    onDelete(data) {
        this.sendDeleteRequest(data);
    },
    sendDeleteRequest(data) {
        axios({
            method: 'DELETE',
            url: `/api/${this.entity.name}/${data.id}`,
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.getUserToken()}`,
            }
        })
        .then((response) => {
            this.fetchPage();
        }).catch(error => {
            console.log(error)
        }).then(_ => {
            this.loading = false
        })
    },
    fetchPage() {
        this.loading = true;
        axios({
            method: 'GET',
            url: `/api/${this.entity.name}`,
            params: {
                page: this.$route.query.page
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.getUserToken()}`,
            }
        })
        .then((response) => {
            console.log(response.data);
            this.entity.page = response.data;
            this.currentPage = response.data.current_page;
        }).catch(error => {
            console.log(error)
        }).then(_ => {
            this.loading = false
        })
    },
  }
}