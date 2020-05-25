import {mapActions, mapState} from "vuex";
import store from '@/store'

export default {
  data() {
    return {
      page: 1,
      dataStart: 0,
      perLength: 50,
      perBlock: 5
    }
  },
  watch: {
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
    startDate: {
      handler() {
        this.setData()
      }
    },
    endDate: {
      handler() {
        this.setData()
      }
    }
  },
  computed: {
    ...mapState('board', {
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
      store.dispatch('board/setIdx', null)
      store.dispatch('board/setShowModal', false)
    },
    writePopup(idx) {
      store.dispatch('board/setIdx', idx)
      store.dispatch('board/setShowModal', true)
    },
    setUserEmail (e){
      store.dispatch('board/setUserEmail', e.target.value)
    },
    setDatePicker (){

      jQuery(".sch_start_date").datepicker({
        onSelect: () => {
          this.page = 1
          this.dataStart = 0

          store.dispatch('board/setStartDate', this.$el.querySelector('.sch_start_date').value)
        }
      })

      jQuery(".sch_end_date").datepicker({
        onSelect: () => {
          this.page = 1
          this.dataStart = 0

          store.dispatch('board/setEndDate', this.$el.querySelector('.sch_end_date').value)
        }
      })

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

        this.setRowAction(data).then(() => {
          this.setData()
          this.close()
        })

      } catch(e) {
        alert("에러! ("+e.message+")")
      }


    },
    delRow() {

      if( confirm('삭제 하시겠습니까?') ) {

        this.delRowAction({
          params: { idx: this.$parent.idx }
        }).then(() => {
          this.setData()
          this.close()
        })

      }

    }
  }
}
