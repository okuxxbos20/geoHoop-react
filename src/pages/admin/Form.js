import React from "react"
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

const Form = () => {
  const { register, handleSubmit, errors, control } = useForm({
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

  const onSubmit = (data) => {
    console.log(data)
  }

  const classes = useStyles()
  return (
    <div className="court-form">
      <form onSubmit={handleSubmit(onSubmit)}　className={classes.root}>
        <div className="upper-side">
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
              <FormLabel>屋内or屋外</FormLabel>
              <Controller
                as={
                  <RadioGroup name="isOutside" className="radio-place">
                    <FormControlLabel value="false" control={<Radio />} label='屋内' />
                    <FormControlLabel value="true" control={<Radio />} label='屋外' />
                  </RadioGroup>
                }
                name="radioGroup"
                rules={{ required: '*どちらか選択してください' }}
                control={control}
                defaultValue={null}
              />
              <FormHelperText>
                {errors.isOutside && errors.isOutside.message}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="lower-side"></div>
        <div className="btn-place">
          <Button
            variant="contained"
            color="primary"
            disabled={Boolean(false)}
            type="submit"
          >
            送信
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form