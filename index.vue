<template>
  <form-create v-model="form" :rule="rule" :option="options" />
</template>

<script>
export default {
  name: 'FormOrtc',
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      rule: [],
      options: {
        resetBtn: false,
        submitBtn: false
      }
    }
  },
  computed: {
    collect() {
      return this.$store.state.collect.isCollect
    }
  },
  watch: {
    'collect': {
      handler: function(val) {
        if (val) {
          this.form.validate((valid) => {
            if (valid) {
            // TODO 验证通过
              var formData = this.form.formData()
              // console.log(formData)
              for (const key in formData) {
                this.$store.commit('collect/SET_FORM_DATA', this.getFormValue(key, formData[key]))
              }
            } else {
            // TODO 验证未通过
              this.$store.commit('collect/SET_COLLECT', false)
              this.$store.commit('collect/CLEAR_DATA', [])
              // this.$store.commit('collect/CLEAR_TABLE', [])
            }
          })
        }
      }
    }
  },
  mounted() {
    this.getType(this.obj)
  },
  methods: {
    getType(form) {
      this.rule.push({
        type: 'el-row',
        native: false,
        children: [
          {
            type: 'el-col',
            props: {
              span: 24
            },
            children: this.getOrtc(form.fields)
          }
        ]
      })
    },
    getOrtc(item) {
      const arr = []
      item.map((ls, index) => {
        if (index % 2) {
          arr.push(this.getChild(ls, false))
        } else {
          arr.push(this.getChild(ls, true))
        }
      })
      return arr
    },
    getChild(item, boole) {
      let col = {}
      if (boole) {
        col = {
          span: 11,
          labelWidth: '1'
        }
      } else {
        col = {
          span: 11,
          labelWidth: '1',
          offset: 2
        }
      }
      let arr = {}
      switch (item.type) {
        // 基础控件
        case 'text':
          if (item.field_value && item.field_value.length === 0) {
            var textValue = ''
          } else if (item.field_value.length === 1) {
            textValue = item.field_value[0].field_detail ? item.field_value[0].field_detail.value : ''
          }
          arr = {
            type: 'input',
            field: item.id,
            title: item.title,
            value: textValue,
            col,
            props: {
              type: item.setting.text_style,
              disabled: item.setting.read_only
            },
            validate: [
              { required: item.verification.required, message: `请输入${item.title}`, trigger: 'blur' }
            ]
          }
          break
        case 'sys':
          if (item.field_value && item.field_value.length === 0) {
            var sysValue = ''
          } else if (item.field_value.length === 1) {
            sysValue = item.field_value[0].field_detail ? item.field_value[0].field_detail.value : ''
          }
          arr = {
            type: 'input',
            field: item.id,
            title: item.title,
            value: sysValue,
            col,
            props: {
              type: item.setting.text_style,
              disabled: item.setting.read_only
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ]
          }
          break
        case 'number':
          if (item.field_value && item.field_value.length === 0) {
            var numberValue = ''
          } else if (item.field_value.length === 1) {
            numberValue = item.field_value[0].field_detail ? item.field_value[0].field_detail.value : 0
          }
          arr = {
            type: 'InputNumber',
            field: item.id,
            title: item.title,
            value: numberValue,
            col,
            props: {
              precision: 0,
              disabled: item.setting.read_only,
              controls: false
            },
            validate: [
              { required: item.verification.required, message: `请输入${item.title}`, trigger: 'blur' }
            ]
          }
          break
        case 'radio':
          if (item.field_value && item.field_value.length === 0) {
            var radioValue = ''
          } else if (item.field_value.length === 1) {
            radioValue = item.field_value[0].field_detail.choice
          }
          arr = {
            type: 'radio',
            field: item.id,
            title: item.title,
            value: radioValue,
            col,
            props: {
              disabled: item.setting.read_only
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ],
            options: this.getOptions(item)
          }
          break
        case 'address':
          arr = {
            type: 'el-row',
            native: false,
            children: [
              {
                type: 'el-col',
                props: {
                  span: 24
                },
                children: [
                  {
                    type: 'cascader',
                    title: item.title,
                    field: item.id,
                    value: ['陕西省', '西安市', '新城区'],
                    col,
                    props: {
                      options: window.province || []
                    }
                    // options: this.getOptions(item)
                  },
                  {
                    type: 'input',
                    title: '.',
                    field: 'address',
                    value: '',
                    col,
                    props: {
                      type: 'text'
                    },
                    validate: [
                      { required: false }
                    ]
                  }
                ]
              }
            ]
          }
          break
        case 'datetime':
          arr = {
            type: 'DatePicker',
            field: item.id,
            title: item.title,
            value: ['2018-02-20'],
            col,
            props: {
              type: 'datetimerange',
              disabled: item.setting.read_only,
              placeholder: `请选择${item.title}`,
              format: 'yyyy-MM-dd'
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ]
          }
          break
        case 'checkbox':
          arr = {
            type: 'checkbox',
            field: item.id,
            title: item.title,
            value: [],
            col,
            props: {
              disabled: item.setting.read_only
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ],
            options: this.getOptions(item)
          }
          break
        case 'file':
          arr = {
            type: 'upload',
            field: item.id,
            title: item.title,
            col: {
            //   span: 24,
              labelWidth: '1'
            },
            props: {
              type: 'select',
              disabled: item.setting.read_only,
              uploadType: 'image',
              action: '/upload.php',
              name: 'pic',
              multiple: true,
              accept: 'image\/*',
              limit: 2,
              onSuccess: function(res, file) {
                file.url = res.data.filePath
              }
            }
          }
          break
        case 'textarea':
          arr = {
            type: 'input',
            field: item.id,
            title: item.title,
            vaule: item.value ? item.value : '',
            col,
            props: {
              disabled: item.setting.read_only,
              type: 'textare',
              resize: 'none'
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ]
          }
          break
        case 'select':
          arr = {
            type: 'select',
            field: item.id,
            title: item.title,
            value: '',
            col,
            props: {
              disabled: item.setting.read_only
            },
            validate: [
              { message: `请输入${item.title}`, trigger: 'blur', required: item.verification.required }
            ],
            options: this.getOptions(item)
          }
          break
      }
      return arr
    },
    getOptions(item) {
      const options = []
      item.choice.map(ls => {
        options.push({
          value: ls.title,
          label: ls.title,
          disabled: ls.verification.required
        })
      })
      return options
    },
    getFormValue(key, value) {
      let field = ''
      let field_value = {}
      this.obj.fields.map(ls => {
        const id = ls.id
        field = id
        switch (ls.type) {
          case 'sys':
            field_value = {
              value: value
            }
            break
          case 'text':
            field_value = {
              value: value
            }
            break
          case 'number':
            field_value = {
              value: value
            }
            break
          case 'radio':
            var res = ls.choice.filter(os => {
              return os.title === value
            })[0]
            if (res) {
              var choice = res.id
            }
            field_value = {
              choice: choice || ''
            }
            break
          case 'select':
            var res1 = ls.choice.filter(os => {
              return os.title === value
            })[0]
            if (res1) {
              var select = res.id
            }
            field = ls.id
            field_value = {
              choice: select || ''
            }
            break
          case 'textarea':
            field_value = {
              value: value
            }
            break
          case 'address':
            field_value = {
              value: value
            }
            break
          case 'datetime':
            field_value = {
              value: value
            }
            break
          case 'checkbox':
            field_value = {
              check_value: value,
              fill: ''
            }
            break
          case 'file':
            field_value = {
              files: value
            }
            break
          case 'image':
            field_value = {
              imgs: value
            }
            break
        }
      })
      return {
        field,
        field_value
      }
    }
  }
}
</script>

<style>

</style>
