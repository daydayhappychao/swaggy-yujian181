import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import userStore from '@/stores/userStore';
import moment from 'moment';

@observer
@Component
export default class Users extends Vue {
  public addDialogShow = false;
  public searchForm = { page: 1 };
  public addDialogForm: { avatar: string, phone: number, nick_name: string, level: number, introduction: string, birthday: string, balance: number, gender: number, create_date: string, id?: number, passwd: string } =
    { passwd: '', avatar: '', phone: 0, nick_name: '', level: 0, introduction: '', birthday: '', balance: 0, gender: 0, create_date: '' }
  public beforeCreate() {
    userStore.getUsers(1);
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
                    this.addDialogForm =
                      { passwd: '', avatar: '', phone: 0, nick_name: '', level: 0, introduction: '', birthday: '', balance: 0, gender: 0, create_date: '' };
                    this.addDialogShow = true;
                  }}>新增用户</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(userStore.userList)}
          border
          style='width: 100%'>
          <el-table-column
            prop='id'
            label='id'>
          </el-table-column>
          <el-table-column
            prop='avatar'
            label='头像'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={`${scope.row.avatar}`} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='phone'
            label='手机号'>
          </el-table-column>
          <el-table-column
            prop='nick_name'
            label='昵称'>
          </el-table-column>
          <el-table-column
            prop='level'
            label='level'>
          </el-table-column>
          <el-table-column
            prop='introduction'
            label='个人介绍'>
          </el-table-column>
          <el-table-column
            prop='birthday'
            label='生日'>
          </el-table-column>
          <el-table-column
            prop='balance'
            label='余额'>
          </el-table-column>
          <el-table-column
            prop='gender'
            label='性别'>
            {
              (scope: any) => (
                <span>{scope.row.avatar ? '男' : '女'}</span>
              )
            }
          </el-table-column>
          <el-table-column
            prop='create_date'
            label='注册时间'>
            {
              (scope: any) => (
                <span>{moment(scope.row.create_date).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                      this.addDialogForm = scope.row;
                      this.addDialogShow = true;
                    }}
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                    onClick={() => {
                      userStore.delUser(scope.row.id, this.searchForm.page);
                    }}
                  >删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >
        <el-pagination
          style="text-align:right;margin:20px 0"
          background
          layout="prev, pager, next"
          page-count={userStore.userPage}
          onCurrent-change={(page: number) => {
            this.searchForm.page = page;
            userStore.getUsers(page);
          }}
        >
        </el-pagination>
        {
          this.addDialogShow &&
          (<el-dialog
            title={`${this.addDialogForm.id ? '編輯' : '新增'}用户`}
            visible={true}
            width='70%'
            before-close={() => {
              this.addDialogForm =
                { passwd: '', avatar: '', phone: 0, nick_name: '', level: 0, introduction: '', birthday: '', balance: 0, gender: 0, create_date: '' };
              this.addDialogShow = false;
            }}
          >
            <el-form label-position='right' label-width='80px' model={this.addDialogForm} ref='addDialogShow' >
              <el-form-item label='手机号'
                prop='phone'
                rules={[
                  { required: true, message: '请输入手机号' },
                ]}>
                <el-input v-model={this.addDialogForm.phone}></el-input>
              </el-form-item>
              <el-form-item label='昵称'
                prop='nick_name'
                rules={[
                  { required: true, message: '请输入昵称' },
                ]}>
                <el-input v-model={this.addDialogForm.nick_name}></el-input>
              </el-form-item>
              {/* <el-form-item label='简介'
                prop='introduction'
                rules={[
                  { required: true, message: '请输入简介' },
                ]}>
                <el-input v-model={this.addDialogForm.introduction}></el-input>
              </el-form-item> */}
              {/* <el-form-item label='生日'
              prop='birthday'
              rules={[
                { required: true, message: '请输入生日' },
              ]}>
              <el-input v-model={this.addDialogForm.birthday}></el-input>
            </el-form-item> */}
              <el-form-item label='等级'
                prop='level'
                rules={[
                  { required: true, message: '请输入等级' },
                ]}>
                <el-input v-model={this.addDialogForm.level}></el-input>
              </el-form-item>
              <el-form-item label='余额'
                prop='balance'
                rules={[
                  { required: true, message: '请输入余额' },
                ]}>
                <el-input v-model={this.addDialogForm.balance}></el-input>
              </el-form-item>
              <el-form-item label='密码'
                prop='passwd'
                rules={[
                  { required: true, message: '请输入密码' },
                ]}>
                <el-input v-model={this.addDialogForm.passwd}></el-input>
              </el-form-item>
              <el-form-item>
                <span >
                  <el-button onClick={() => { this.addDialogShow = false; }}>取 消</el-button>
                  <el-button type='primary' onClick={() => {
                    (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                      if (valid) {
                        userStore.createUser(this.addDialogForm, this.searchForm.page);
                        this.addDialogForm = { passwd: '', avatar: '', phone: 0, nick_name: '', level: 0, introduction: '', birthday: '', balance: 0, gender: 0, create_date: '' };
                        this.addDialogShow = false;
                      }
                    });
                  }}>确 定</el-button>
                </span>
              </el-form-item>
            </el-form>
          </el-dialog>
          )
        }
      </el-container>
    );
  }
}
