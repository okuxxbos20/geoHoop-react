import React, { useState } from "react"
import './scss/Form.scss'
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button
} from '@material-ui/core'
import prejson from '../../assets/json/prefecture.json'
import cityjson from '../../assets/json/city.json'
import { CameraIcon } from '../../assets/icons'

const Form = () => {
  const defaultValue = {
    address: '',
    courtName: '',
    prefecture: '',
    city: '',
    isOutside: null,
    googleMapsUrl: '',
    goalCount: '',
    embedSrc: '',
    refUrl: '',
    tel: '',
    zipcode: ''
  }
  const defaultError = {
    address: '',
    courtName: '',
    prefecture: '',
    city: '',
    isOutside: '',
    googleMapsUrl: '',
    goalCount: '',
    embedSrc: '',
    refUrl: '',
    tel: '',
    zipcode: ''
  }
  const [val, setVal] = useState(defaultValue)
  const [err, setErr] = useState(defaultError)
  const [previewImg, setPreviewImg] = useState('')
  const [validationResult, setValidationResult] = useState(false)
  const [cityArr, setCityArr] = useState([])

  const submitData = async (e) => {
    e.preventDefault()
    const valName = e.target.name
    const givenVal = e.target.value

    if (valName === 'img') {
      const file = valName.img[0]
      const imgValidationResult = checkFile(file)
      if (imgValidationResult) {
        const preview = await getBase64(file)
        setPreviewImg(preview)
      }
    } else {
      setVal({ ...val, [valName]: givenVal})
    }
    // ここでfirebaseにデータをsetする
    // TODO: 型が全て強制的にstringになってしまう
    setValidationResult(checkValidation(valName, givenVal))
    // if (validationResult) {
    //   console.log('yo')
    //   alert(JSON.stringify(val))
    // }
  }

  console.log(val)
  const checkValidation = async(name, value) => {
    let result = false
    if (name === 'address') {
      if (value.length === 0) {
        setErr({ ...err, [name]: '*必須項目です'})
      }
      else if (value.length >= 100) {
        setErr({ ...err, [name]: '正しい住所を入力してください'})
      } else {
        setErr({ ...err, [name]: ''})
      }
    }
    return result
  }
  // addess
  const addressValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    if (value.length === 0) {
      setErr({ ...err, [e.target.name]: '*入力項目は必須です'})
    } else if (value.length > 99) {
      setErr({ ...err, [e.target.name]: '*99文字以内で入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // courtName
  const courtNameValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    if (value.length === 0) {
      setErr({ ...err, [e.target.name]: '*入力項目は必須です'})
    } else if (value.length > 99) {
      setErr({ ...err, [e.target.name]: '*99文字以内で入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // prefecture
  const selectPrefecture = (e) => {
    const code = e.target.value
    const pre = prejson.filter((v) => v.code === code)[0].name
    const newCityArr = cityjson.filter((v) => v.id === code)[0].cities;
    setVal({ ...val, prefecture: pre})
    console.log(newCityArr)
    setCityArr([...newCityArr])
    console.log(cityArr)
  }
  // isOutside
  const isOutsideValidation = (e) => {
    const value = e.target.value === 'true' ? true : false
    setVal({ ...val, [e.target.name]: value })
  }
  // googleMapsUrl
  const googleMapsUrlValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    if (value.length === 0) {
      setErr({ ...err, [e.target.name]: '*入力項目は必須です'})
    } else if (!value.startsWith('https://www.google.com/maps/')) {
      setErr({ ...err, [e.target.name]: '*正しいURLを入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // goalCount
  const goalCountValidation = (e) => {
    const value = Number(e.target.value)
    console.log(typeof(value))
    setVal({ ...val, [e.target.name]: value })
    if (isNaN(value)) {
      setVal({ ...val, [e.target.name]: '' })
      setErr({ ...err, [e.target.name]: '*半角数字で入力してください'})
    } else if (value < 0) {
      setErr({ ...err, [e.target.name]: '*1以上の数を入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // embedSrcValidation
  const embedSrcValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    if (value.length === 0) {
      setErr({ ...err, [e.target.name]: '*入力項目は必須です'})
    } else if (!value.startsWith('https://www.google.com/maps/embed?')) {
      setErr({ ...err, [e.target.name]: '*正しいURLを入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // refUrl
  const refUrlValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    if (value.length > 0 && !value.startsWith('http')) {
      setErr({ ...err, [e.target.name]: '*正しいURLを入力してください'})
    } else {
      setErr({ ...err, [e.target.name]: ''})
    }
  }
  // tel
  const telValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    // if (value.length > 0 && !value.startsWith('http')) {
    //   setErr({ ...err, [e.target.name]: '*正しい電話番号を入力してください'})
    // } else {
    //   setErr({ ...err, [e.target.name]: ''})
    // }
  }
  const zipcodeValidation = (e) => {
    const value = e.target.value
    setVal({ ...val, [e.target.name]: value })
    // if (value.length > 0 && !value.startsWith('http')) {
    //   setErr({ ...err, [e.target.name]: '*正しい郵便番号を入力してください'})
    // } else {
    //   setErr({ ...err, [e.target.name]: ''})
    // }
  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  const checkFile = (file) => {
    let result = true
    const sizeLimit = 5000 * 1000
    if (!file) { result = false }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      result = false
    }
    if (file.size > sizeLimit) { result = false }
    return result
  }

  return (
    <div className="court-form">
      <form onSubmit={submitData}>
        <div className="overwrap-box">
          <div className="upper-side">
            {/* 住所 */}
            <div className="input-place">
              <TextField
                label="住所"
                name="address"
                value={val.address}
                onChange={addressValidation}
                type="text"
                fullWidth
                autoFocus
                error={err.address !== '' && true}
                helperText={err.address}
              />
            </div>
            {/* コート名称 */}
            <div className="input-place">
              <TextField
                label="コート名称"
                name="courtName"
                value={val.courtName}
                onChange={courtNameValidation}
                type="text"
                fullWidth
                error={err.courtName !== '' && true}
                helperText={err.courtName}
              />
            </div>
            {/* 都道府県 */}
            <div className="input-place">
              <FormControl
                type="select"
                fullWidth
                error={val.prefecture !== '' && true}
              >
                <InputLabel id="prefecture">都道府県</InputLabel>
                <Select
                  labelId="prefecture"
                  name="prefecture"
                  value={val.prefecture}
                  onChange={selectPrefecture}
                >
                  {prejson.map((v) => {
                    return (<MenuItem value={v.code} key={v.name}>{v.name}</MenuItem>)
                  })}
                </Select>
                {err.prefcture !== '' &&
                  <FormHelperText>{err.prefecture}</FormHelperText>
                }
              </FormControl>
            </div>
            {/* 市町村区 */}
            <div className="input-place">
              <FormControl
                type="select"
                fullWidth
                error={val.city !== '' && true}
              >
                <InputLabel id="city">市町村区</InputLabel>
                <Select
                  labelId="city"
                  name="city"
                  value={val.city}
                  onChange={submitData}
                >
                  {cityArr.map((v) => {
                    return (<MenuItem value={v.name} key={v.name}>{v.name}</MenuItem>)
                  })}
                </Select>
                {err.city !== '' &&
                  <FormHelperText>{err.city}</FormHelperText>
                }
              </FormControl>
            </div>
            {/* 屋外or屋内 */}
            <div className="input-place">
              <FormControl>
                <FormLabel>屋内or屋外</FormLabel>
                <RadioGroup
                  row
                  aria-label="isOutside"
                  name="isOutside"
                  value={val.isOutside}
                  onChange={isOutsideValidation}
                >
                  <FormControlLabel value={true} control={<Radio />} label="屋外" />
                  <FormControlLabel value={false} control={<Radio />} label="屋内" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* googleMapsUrl */}
            <div className="input-place">
              <TextField
                label="googleMapsUrl"
                name="googleMapsUrl"
                value={val.googleMapsUrl}
                onChange={googleMapsUrlValidation}
                type="text"
                fullWidth
                error={err.googleMapsUrl !== '' && true}
                helperText={err.googleMapsUrl}
              />
            </div>
            {/* ゴールの数 */}
            <div className="input-place">
              <TextField
                label="ゴールの数"
                name="goalCount"
                value={val.goalCount}
                onChange={goalCountValidation}
                type="text"
                fullWidth
                error={err.goalCount !== '' && true}
                helperText={err.goalCount}
              />
            </div>
            {/* embedSrc */}
            <div className="input-place">
              <TextField
                label="iflame用の埋め込みリンク"
                name="embedSrc"
                value={val.embedSrc}
                onChange={embedSrcValidation}
                type="text"
                fullWidth
                error={err.embedSrc !== '' && true}
                helperText={err.embedSrc}
              />
            </div>
          </div>
          <div className="lower-side">
            {/* コート画像 */}
            <div className="imgupload-place">
              <label>
              {previewImg ?
                <img src={previewImg} alt="court-img" />
              :
                <div className="no-uploaded">
                  <CameraIcon color={'#676767'} width={'45px'} height={'45px'} />
                  <input type="file" name="img" />
                  <p className="sentence">画像をアップロード</p>
                </div>
              }
              </label>
            </div>
            {/* 参考URL */}
            <div className="input-place">
              <TextField
                label="参考URL"
                name="refUrl"
                value={val.refUrl}
                onChange={refUrlValidation}
                type="text"
                fullWidth
                error={err.refUrl !== '' && true}
                helperText={err.refUrl}
              />
            </div>
            {/* 電話番号 */}
            <div className="input-place">
              <TextField
                label="電話番号"
                name="tel"
                value={val.tel}
                onChange={telValidation}
                type="text"
                fullWidth
                error={err.tel !== '' && true}
                helperText={err.tel}
              />
            </div>
            {/* 郵便番号 */}
            <div className="input-place">
              <TextField
                label="郵便番号"
                name="zipcode"
                value={val.zipcode}
                onChange={zipcodeValidation}
                type="text"
                fullWidth
                error={err.zipcode !== '' && true}
                helperText={err.zipcode}
              />
            </div>
          </div>
        </div>
        <div className="btn-place">
          <Button
            variant="contained"
            color="primary"
            disabled={!validationResult}
            type="submit"
          >
            submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form