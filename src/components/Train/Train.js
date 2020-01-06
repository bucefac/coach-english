import Dictionary from '@/dictionary/Dictionary'

export default {
  data () {
    return {
      seconds: 5,
      maxSeconds: 5,
      interval: null,
      goal: null,
    }
  },
  computed: {
    progress () {
      return this.seconds / this.maxSeconds * 100
    },
    question () {
      return this.goal.en
    },
    ask () {
      return this.seconds === 0 && this.goal.ru
    }
  },
  created () {
    this.$d = new Dictionary()
    this.goal = this.$d.getRandom()
    this.startTimer()
  },
  methods: {
    startTimer () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.goal = this.$d.getRandom()
      this.seconds = this.maxSeconds
      this.interval = setInterval(this.timer, 1000)
    },
    timer () {
      this.seconds--  
      if (this.seconds === 0) {
        clearInterval(this.interval)
      }
    }
  }
}
