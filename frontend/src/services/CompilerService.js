import Api from '@/services/Api'

export default {
  compileCode (dslCode) {
    console.log('\n' + dslCode)
    return Api().post('compile', {
      code: dslCode
    })
  }
}
