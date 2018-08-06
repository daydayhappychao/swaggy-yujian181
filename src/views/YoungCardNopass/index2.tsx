import { Vue, Component } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import youngCardStore from '@/stores/youngCard';

@observer
@Component
export default class YoungCardNopass extends Vue {
  public beforeCreate() {
    youngCardStore.getNopass(this.$route.name === 'youngCardNopass' ? 0 : 1);
  }
  public dialogShow = false;
  public dialogForm: any = {}
  public render() {
    return (
      <div>
        <el-table
          data={toJS(youngCardStore.nopassList)}
          border
          onChange={() => { }}
          style='width: 100%'>
          <el-table-column
            fixed
            width='120px'
            label='一寸照'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={scope.row.avatar} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='name'
            label='姓名'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='phone'
            label='联系方式'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='scope'
            label='区域'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='profession'
            label='职业'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='cardId'
            label='卡号'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label='申请时间'>
            {
              (scope: any) => (
                <div>
                  {
                    moment(scope.row.applyDate).format('YYYY-MM-DD HH:mm:ss')
                  }
                </div>
              )
            }
          </el-table-column>
          <el-table-column
            label='审核时间'>
            {
              (scope: any) => (
                <div>
                  {
                    moment(scope.row.updateDate).format('YYYY-MM-DD HH:mm:ss')
                  }
                </div>
              )
            }
          </el-table-column>

          <el-table-column
            label='状态'
          >
            {
              (scope: any) => (
                <div>
                  {scope.row.status === 1 ? '已通过' : '未通过'}
                </div>
              )
            }
          </el-table-column>
          <el-table-column
            label='操作'
            width='200'
          >
            {
              (scope: any) =>
                <div >
                  <el-button
                    size='mini'
                    onClick={() => {
                      this.dialogForm = scope.row;
                      this.dialogShow = true;
                    }}
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type="danger"
                    onClick={() => {
                      youngCardStore.deleteYoungCard(scope.row._id);
                    }}>删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >



        <el-dialog
          title='编辑青年卡'
          visible={this.dialogShow}
          width='70%'
          before-close={() => {
            this.dialogForm =
              {};
            this.dialogShow = false;
          }}
        >
          <el-form label-position='right' label-width='80px' model={this.dialogForm} ref='addDialogShow' >
            <el-form-item label='一寸照'>
              <el-button
                size='mini'
                type='primary'
                onClick={() => {
                  (this.$refs.file as any).click();
                }}
              >上传图片</el-button>
              <img style='width:100%;' src={this.dialogForm.avatar ? `${this.dialogForm.avatar}` : ''} />
              <input type='file' onChange={(ev: any) => {
                if (ev.target.files) {
                  const form = new FormData();
                  form.append('file', ev.target.files[0]);
                  axios.post('/api/upload', form, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }).then((res) => {
                    if (res.data.status === 0) {
                      this.dialogForm.avatar = res.data.message;
                    }
                  });
                }
              }} ref='file' style={{ display: 'none' }} />
            </el-form-item>
            <el-form-item label='姓名'
              prop='name'
              rules={[
                { required: true, message: '请输入商户名称' },
              ]}>
              <el-input v-model={this.dialogForm.name}
              ></el-input>
            </el-form-item>
            <el-form-item label='联系方式'
              prop='phone'
              rules={[
                { required: true, message: '请输入联系方式' },
              ]}>
              <el-input v-model={this.dialogForm.phone}
              ></el-input>
            </el-form-item>

            <el-form-item label='区域'
              prop='scope'
              rules={[
                { required: true, message: '请输入区域' },
              ]}>
              <el-input
                autosize
                v-model={this.dialogForm.scope}
              ></el-input>
            </el-form-item>

            <el-form-item label='职业'
              prop='profession'
              rules={[
                { required: true, message: '请输入职业' },
              ]}>
              <el-input
                type='textarea'
                autosize
                v-model={this.dialogForm.profession}
              ></el-input>
            </el-form-item>

            <el-form-item label='状态'>
              <div >
                <el-select v-model={this.dialogForm.status} placeholder='请选择'>
                  <el-option
                    label='通过'
                    value={1}>
                  </el-option>

                  <el-option
                    label='不通过'
                    value={2}>
                  </el-option>


                </el-select>
              </div>
            </el-form-item>

            <el-form-item>
              <span >
                <el-button onClick={() => { this.dialogShow = false; }}>取 消</el-button>
                <el-button type='primary' onClick={() => {
                  (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                    if (valid) {
                      axios.post('/api/updateYoungCard2/' + this.dialogForm._id,this.dialogForm).then(res=>{
                        youngCardStore.getNopass(1);
                        this.dialogShow = false;
                      })
                    }
                  });
                }}>确 定</el-button>
              </span>
            </el-form-item>
          </el-form>
        </el-dialog>

      </div>
    );
  }
}
