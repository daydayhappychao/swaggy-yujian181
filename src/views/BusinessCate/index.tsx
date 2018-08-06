import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import businessStore from '@/stores/businessStore';

@observer
@Component
export default class BusinessCate extends Vue {
  public addDialogShow = false;
  public addDialogForm: { name: string, weight: number, id?: string } = { name: '', weight: 0 };
  public beforeCreate() {
    businessStore.getCateList();
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
                  onClick={() => {
                    this.addDialogForm = { name: '', weight: 0 };
                    this.addDialogShow = true;
                  }}>新增分类</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(businessStore.cateList)}
          border
          style='width: 100%'>
          <el-table-column
            fixed
            prop='name'
            label='名称'>
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
                    onClick={() => {
                      this.addDialogForm = scope.row;
                      this.addDialogForm.id = scope.row._id;
                      this.addDialogShow = true;
                    }}
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                    onClick={businessStore.deleteCate.bind(null, scope.row._id)}>删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >

        <el-dialog
          title={`${this.addDialogForm.id ? '編輯' : '新增'}分类`}
          visible={this.addDialogShow}
          width='30%'
          before-close={() => { this.addDialogForm = { name: '', weight: 0 }; this.addDialogShow = false; }}
        >
          <el-form label-position='right' label-width='80px' model={this.addDialogForm} ref='addDialogShow' >
            <el-form-item label='分类名称'
              prop='name'
              rules={[
                { required: true, message: '请输入分类名' },
              ]}>
              <el-input v-model={this.addDialogForm.name}></el-input>
            </el-form-item>
            <el-form-item label='分类权重'
              prop='weight'
              rules={[
                { required: true, message: '请输入类型权重' },
                { type: 'number', message: '请输入数字类型权重' },
              ]}>
              <el-input value={this.addDialogForm.weight}
                onChange={(e: any) => { this.addDialogForm.weight = (+e ? +e : e); }}
              ></el-input>
            </el-form-item>
            <el-form-item>
              <span >
                <el-button onClick={() => { this.addDialogShow = false; }}>取 消</el-button>
                <el-button type='primary' onClick={() => {
                  (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                    if (valid) {
                      businessStore.createCate(this.addDialogForm.name,
                        this.addDialogForm.weight,
                        this.addDialogForm.id);
                      this.addDialogForm = { name: '', weight: 0 };
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
