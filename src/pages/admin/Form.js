import React, { useState } from "react"
import './scss/Form.scss'
import { useForm, Controller } from "react-hook-form"
import { createStyles, makeStyles } from '@material-ui/core/styles'
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
// import cityjson from '../../assets/json/city.json'
import { CameraIcon } from '../../assets/icons'

const Form = () => {
  const defaultValue = {
    address: '',
    courtname: '',
    prefecture: '',
    city: '',
    isOutside: null,
    googleMapsUrl: '',
    goalCount: 0,
    embedSrc: '',
    refUrl: '',
    tel: 0,
    zipcode: 0
  }

  const [previewImg, setPreviewImg] = useState('')
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: defaultValue,
    onChange: true,
    submitFocusError: true
  })

  const useStyles = makeStyles((theme) => createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100'
      }
    }
  }))

  const onSubmit = async (data) => {
    // ここでfirebaseにデータをsetする
    // TODO: 型が全て強制的にstringになってしまう
    console.log(data)
    const file = data.img[0]
    const imgValidationResult = checkFile(file)

    if (imgValidationResult) {
      const preview = await getBase64(file)
      console.log(preview)
      setPreviewImg(preview)
    }

    alert(JSON.stringify(data))
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

  const classes = useStyles()
  return (
    <div className="court-form">
      <form onSubmit={handleSubmit(onSubmit)}　className={classes.root}>
        <div className="overwrap-box">
          <div className="upper-side">
            {/* 住所 */}
            <div className="input-place">
              <TextField
                label="住所"
                name="address"
                fullWidth
                inputRef={register({ required: true })}
                error={Boolean(errors.address)}
                helperText={errors.address && '*必須項目です'}
              />
            </div>
            {/* コート名称 */}
            <div className="input-place">
              <TextField
                label="コート名称"
                name="courtname"
                fullWidth
                inputRef={register({ required: true, minLength: 3 })}
                error={Boolean(errors.courtname)}
                helperText={errors.courtname && '*必須項目です'}
              />
            </div>
            {/* 都道府県 */}
            <div className="input-place">
              <FormControl fullWidth error={Boolean(errors.prefecture)}>
                <InputLabel>都道府県</InputLabel>
                <Controller
                  as={
                    <Select>
                      {prejson.map((v) => {
                        return (
                          <MenuItem value={v.name} key={v.code}>
                            {v.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  }
                  name="prefecture"
                  rules={{ required: '*必須項目です' }}
                  control={control}
                  defaultValue=""
                />
                <FormHelperText>
                  {errors.prefecture && errors.prefecture.message}
                </FormHelperText>
              </FormControl>
            </div>
            {/* 屋外or屋内 */}
            <div className="input-place">
              <FormControl fullWidth error={Boolean(errors.isOutside)}>
                <FormLabel className="radio-label">屋内or屋外</FormLabel>
                <Controller
                  as={
                    <RadioGroup name="isOutside" className="radio-place">
                      <FormControlLabel value="false" control={<Radio />} label='屋内' />
                      <FormControlLabel value="true" control={<Radio />} label='屋外' />
                    </RadioGroup>
                  }
                  name="isOutside"
                  rules={{ required: '*どちらか選択してください' }}
                  control={control}
                  defaultValue={null}
                />
                <FormHelperText>
                  {errors.isOutside && errors.isOutside.message}
                </FormHelperText>
              </FormControl>
            </div>
            {/* googleMapsUrl */}
            <div className="input-place">
              <TextField
                label="googleMapsUrl"
                name="googleMapsUrl"
                fullWidth
                inputRef={register({ required: true })}
                error={Boolean(errors.googleMapsUrl)}
                helperText={errors.googleMapsUrl && '*必須項目です'}
              />
            </div>
            {/* ゴールの数 */}
            <div className="input-place">
              <TextField
                label="ゴールの数"
                name="goalCount"
                type="number"
                fullWidth
                inputRef={register({
                  required: true,
                  validate: {
                    moreThanOne: (num) => parseInt(num, 10) > 0 || '1以上の数を入力してください'
                  }
                })}
                error={Boolean(errors.goalCount)}
                helperText={
                  errors.goalCount?.type === 'required' ? '*必須項目です' :
                  (errors.goalCount?.type === 'moreThanOne' && errors.goalCount?.message)
                }
              />
              {console.log(errors)}
            </div>
            {/* embedSrc */}
            {/* <div className="input-place">
              <TextField
                  label="iflame用の埋め込みリンク"
                  name="embedSrc"
                  fullWidth
                  inputRef={register({
                    required: true,
                    validate: {
                      startWithHttps: (str) => str.substring(0, 33) === 'https://www.google.com/maps/embed' || '正しいURLを入力してください'
                    }
                  })}
                  error={Boolean(errors.embedSrc)}
                  helperText={
                    errors.embedSrc?.type === 'required' ? '*必須項目です' :
                    (errors.embedSrc?.type === 'startWithHttps' && errors.embedSrc?.message)
                  }
                />
            </div> */}
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
                  <input ref={register} type="file" name="img" />
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
                fullWidth
                inputRef={register({
                  required: false,
                  validate: {
                    startWithHttp: (str) => (str === '' || str.substring(0, 4) === 'http') || '正しいURLを入力してください'
                  }
                })}
                error={Boolean(errors.refUrl)}
                helperText={errors.refUrl?.type === 'startWithHttp' && errors.refUrl?.message}
              />
            </div>
            {/* 電話番号 */}
            <div className="input-place">
              <TextField
                label="電話番号"
                name="tel"
                fullWidth
                inputRef={register({
                  required: false,
                  // validate: {
                  //   isTypeNum: (str) => {

                  //   } || '数字で入力してください'
                  // }
                })}
                error={Boolean(errors.tel)}
                helperText={errors.tel?.type === 'isTypeNum' && errors.tel?.message}
              />
            </div>
            {/* 郵便番号 */}
            <div className="input-place">
              <TextField
                label="郵便番号"
                name="zipcode"
                fullWidth
                inputRef={register({
                  required: false,
                  // validate: {
                  //   isTypeNum: (str) => {

                  //   } || '数字で入力してください'
                  // }
                })}
                error={Boolean(errors.zipcode)}
                helperText={errors.zipcode?.type === 'isTypeNum' && errors.zipcode?.message}
              />
            </div>
          </div>
        </div>
        <div className="btn-place">
          <Button
            variant="contained"
            color="primary"
            disabled={Boolean(false)}
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