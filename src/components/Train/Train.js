import Dictionary from '@/dictionary/Dictionary'

export default {
  data () {
    return {
      seconds: 4,
      maxSeconds: 4,
      meditationInterval: null,
      enlightenmentInterval: null,
      goal: null,
      iteration: 0,
    }
  },
  computed: {
    progress () {
      return this.seconds / this.maxSeconds * 100
    },
    question () {
      return this.goal.en
    },
    answer () {
      return this.iteration === 1 && this.goal.ru
    }
  },
  created () {
    this.$d = new Dictionary()
    this.goal = this.$d.getRandom()
    this.startMeditationTimer()
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    onKeydown (e) {
      switch (e.code) {
        case 'Space': {
          this.nextIteration()
        }
      }
    },
    nextIteration () {
      this.iteration = (this.iteration + 1) % 2
      this.seconds = this.maxSeconds
      if (this.iteration === 0) {
        clearInterval(this.enlightenmentInterval)
        this.startMeditationTimer()
      } else {
        clearInterval(this.meditationInterval)
        this.startEnlightenmentTimer()
      }
    },
    startEnlightenmentTimer () {
      if (this.enlightenmentInterval) {
        clearInterval(this.enlightenmentInterval)
      }
      this.enlightenmentInterval = setInterval(this.enlightenmentTimer, 1000)
    },
    startMeditationTimer () {
      if (this.meditationInterval) {
        clearInterval(this.meditationInterval)
      }
      this.goal = this.$d.getRandom()
      this.voiceText(this.question)
      this.meditationInterval = setInterval(this.meditationTimer, 1000)
    },
    enlightenmentTimer () {
      this.seconds--  
      if (this.seconds === 0) {
        clearInterval(this.enlightenmentInterval)
        this.nextIteration()
      }
    },
    meditationTimer () {
      this.seconds--  
      if (this.seconds === 0) {
        clearInterval(this.meditationInterval)
        this.nextIteration()
      }
    },
    voiceText (text) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }
}
