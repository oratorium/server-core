if (process.env.NODE_ENV === 'development') {
  require('./development')
} else if (process.env.NODE_ENV === 'production') {
  require('./production')
} else {
  throw new Error('알 수 없는 모드입니다')
}
