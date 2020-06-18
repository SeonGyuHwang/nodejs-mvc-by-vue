import {mapActions, mapState} from "vuex";
import store from '@/store'

export default {
  data() {
    return {
      dataPage: 1,
      dataStart: 0,
      perLength: 50,
      perBlock: 5,
      popupOpen: false,
      choiceDate: null,
      schStartDate: null,
      schEndDate: null
    }
  },
  watch: {
    popupOpen: {
      deep: true,
      handler() {
        store.dispatch('board/setShowModal', this.popupOpen)
      }
    },
    dataStart: {
      deep: true,
      handler() {
        this.setData()
      }
    },
    perLength: {
      handler() {
        this.setData()
      }
    },
    schStartDate: {
      handler(nVal) {
        this.dataPage = 1
        this.dataStart = 0

        store.dispatch('board/setStartDate', nVal ? moment(nVal).format('YYYY-MM-DD') : null)
        this.setData()
      }
    },
    schEndDate: {
      handler(nVal) {
        this.dataPage = 1
        this.dataStart = 0

        store.dispatch('board/setEndDate', nVal ? moment(nVal).format('YYYY-MM-DD') : null)
        this.setData()
      }
    }
  },
  computed: {
    ...mapState('board', {
      idx: state => state.idx,
      startDate: state => state.startDate,
      endDate: state => state.endDate,
      showModal: state => state.showModal
    }),
    ...mapState('common', {
      user_info: state => state.user_info,
      contentLoading: state => state.contentLoading
    }),
    totalCountNumberFormat() {
      return number_format(this.totalCount)
    }
  },
  methods: {
    ...mapActions('board', {
      getRowAction: 'getRow',
      setRowAction: 'setRow',
      delRowAction: 'delRow',
      getListAction: 'getList'
    }),
    close(){
      this.$emit('close')
    },
    writeClose() {
      this.popupOpen = false
      store.dispatch('board/setIdx', null)
    },
    writePopup(idx) {
      this.popupOpen = true
      store.dispatch('board/setIdx', idx)
    },
    setUserEmail (e){
      store.dispatch('board/setUserEmail', e.target.value)
    },
    setData(){

      this.getListAction({
        params: {
          sch_user_email: this.userEmail,
          sch_start_date: this.startDate,
          sch_end_date: this.endDate,
          start: this.dataStart,
          length: this.perLength
        }
      })

    },
    proc() {

      try {

        const formData = new FormData(this.$refs['publicFrm']); // reference to form element
        const data = {}; // need to convert it before using not with XMLHttpRequest
        for (let [key, val] of formData.entries())
          Object.assign(data, { [key]: val })

        window._loading_container = this.$refs.publicFrm;
        this.setRowAction(data).then(() => {
          this.setData()
          this.close()
        })

      } catch(e) {
        alert("에러! ("+e.message+")")
      }


    },
    delRow() {

      this.delRowAction({
        container: this.$refs.publicFrm,
        params: { idx: this.$parent.idx }
      }).then(() => {
        this.setData()
        this.close()
      })

    }
  }
}
