import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import coursesStore from '@/stores/courses';

@observer
@Component
export default class Users extends Vue {
  public addDialogShow = false;
  public addDialogForm: { name: string, weight: number, id?: string } = { name: '', weight: 0 };
  public beforeCreate() {
    coursesStore.getCourses();
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
                  }}>新增课程</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(coursesStore.courses)}
          border
          style='width: 100%'>
          <el-table-column
            fixed
            prop='id'
            label='id'>
          </el-table-column>
          <el-table-column
            prop='avatar'
            label='封面图'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={`${scope.row.avatar}`} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='title'
            label='标题'>
          </el-table-column>
          <el-table-column
            prop='description'
            label='简介'>
          </el-table-column>
          <el-table-column
            prop='play_times'
            label='播放次数'>
          </el-table-column>
          <el-table-column
            prop='total_serials'
            label='集数'>
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
                   
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                  >删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >

        {/* <el-dialog
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
        </el-dialog> */}

      </el-container>
    );
  }
}
