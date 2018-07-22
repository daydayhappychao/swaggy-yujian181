import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import axios from 'axios';
import businessStore from '@/stores/businessStore';

@observer
@Component
export default class BusinessCate extends Vue {
  public addDialogShow = false;
  public addDialogForm = { avatar: '', name: '', weight: 0, phone: '', introduction: '', discount: '', cate: '', address: '' };
  public beforeCreate() {
    businessStore.getCateList();
    businessStore.getInfoList();
  }
  public render() {
    return (
      <el-container>
        <el-header>
          <div style={{ width: '100%' }}>
            <el-row gutter={20}>
              <el-col span={6} offset={18} style={{ textAlign: 'right' }}>
                <el-button
                  size='mini'
                  type='primary'
                  onClick={() => { this.addDialogShow = true; }}>新增商家</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(businessStore.infoList)}
          border
          style='width: 100%'>
          <el-table-column
            fixed
            width='120px'
            prop='name'
            label='商户名称'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={`/public/${scope.row.avatar}`} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='name'
            label='商户名称'>
          </el-table-column>
          <el-table-column
            prop='phone'
            label='联系方式'>
          </el-table-column>
          <el-table-column
            prop='introduction'
            label='简介'>
          </el-table-column>
          <el-table-column
            prop='discount'
            label='优惠方式'>
          </el-table-column>
          <el-table-column
            prop='address'
            label='地址'>
          </el-table-column>
          <el-table-column
            label='分类'>
            {
              (scope: any) => (
                <div>{
                  businessStore.cateList.filter((v) => v._id === scope.row.cate)[0].name
                }</div>
              )
            }
          </el-table-column>
          <el-table-column
            prop='weight'
            label='权重'
            width='120'>
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
                    click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                    onClick={businessStore.deleteInfo.bind(null, scope.row._id)}>删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >

        <el-dialog
          title='新增商家'
          visible={this.addDialogShow}
          width='70%'
          before-close={() => {
            this.addDialogForm = { avatar: '', name: '', weight: 0, phone: '', introduction: '', discount: '', cate: '', address: '' };
            this.addDialogShow = false;
          }}
        >
          <el-form label-position='right' label-width='80px' model={this.addDialogForm} ref='addDialogShow' >
            <el-form-item label='封面图'>
              <el-button
                size='mini'
                type='primary'
                onClick={() => {
                  (this.$refs.file as any).click();
                }}
              >上传图片</el-button>
              <img style='width:100%;' src={this.addDialogForm.avatar ? `/public/${this.addDialogForm.avatar}` : ''} />
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
                      this.addDialogForm.avatar = res.data.message;
                    }
                  });
                }
              }} ref='file' style={{ display: 'none' }} />
            </el-form-item>
            <el-form-item label='商户名称'
              prop='name'
              rules={[
                { required: true, message: '请输入商户名称' },
              ]}>
              <el-input v-model={this.addDialogForm.name}
              ></el-input>
            </el-form-item>
            <el-form-item label='联系方式'
              prop='phone'
              rules={[
                { required: true, message: '请输入联系方式' },
              ]}>
              <el-input v-model={this.addDialogForm.phone}
              ></el-input>
            </el-form-item>

            <el-form-item label='地址'
              prop='address'
              rules={[
                { required: true, message: '请输入地址' },
              ]}>
              <el-input
                autosize
                v-model={this.addDialogForm.address}
              ></el-input>
            </el-form-item>

            <el-form-item label='简介'
              prop='introduction'
              rules={[
                { required: true, message: '请输入简介' },
              ]}>
              <el-input
                type='textarea'
                autosize
                v-model={this.addDialogForm.introduction}
              ></el-input>
            </el-form-item>

            <el-form-item label='优惠方式'
              prop='discount'
              rules={[
                { required: true, message: '请输入优惠方式' },
              ]}>
              <el-input
                type='textarea'
                autosize
                v-model={this.addDialogForm.discount}
              ></el-input>
            </el-form-item>
            <el-form-item label='权重'
              prop='weight'
              rules={[
                { required: true, message: '请输入权重' },
                { type: 'number', message: '请输入数字类型权重' },
              ]}>
              <el-input value={this.addDialogForm.weight}
                onChange={(e: any) => { this.addDialogForm.weight = (+e ? +e : e); }}
              ></el-input>
            </el-form-item>
            <el-form-item label='商家类别'>
              <div >
                <el-select v-model={this.addDialogForm.cate} placeholder='请选择'>
                  {
                    businessStore.cateList.map((v, k) => (
                      <el-option
                        key={k}
                        label={v.name}
                        value={v._id}>
                      </el-option>
                    ))
                  }
                </el-select>
              </div>
            </el-form-item>
            <el-form-item>
              <span >
                <el-button onClick={() => { this.addDialogShow = false; }}>取 消</el-button>
                <el-button type='primary' onClick={() => {
                  (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                    if (valid) {
                      businessStore.createInfo(this.addDialogForm);
                      this.addDialogForm = { avatar: '', name: '', weight: 0, phone: '', introduction: '', discount: '', cate: '', address: '' };
                      this.addDialogShow = false;
                    }
                  });
                }}>确 定</el-button>
              </span>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-container>
    );
  }
}
