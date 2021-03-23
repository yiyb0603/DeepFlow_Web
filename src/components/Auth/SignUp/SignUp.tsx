import { CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Select } from 'antd';
import { CgHello } from 'react-icons/cg';
import { BiBuilding } from 'react-icons/bi';
import { AiOutlineLink } from 'react-icons/ai';
import { HiCode } from 'react-icons/hi';
import { generations, IAuthOption, majors } from 'lib/models/AuthOption';
import InfoInput from '../InfoInput';
import RegisterSubmit from '../RegisterSubmit';
import SignUpProps from './SignUp.props';

const { Option } = Select;
const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SignUp = ({
  isLoading,
  request,
  descriptionState,
  locationState,
  blogState,
  positionState,
  generationState,
  majorState,
  requestRegister,
}: SignUpProps) => {
  const { avatar, name, githubId } = request;
  const selectStyle: CSSProperties = {
    width: '45%',
  };

  return (
    <div className={cx('SignUp')}>
      <div className={cx('SignUp-Wrapper')}>
        <div className={cx('SignUp-Top')}>
          <div className={cx('SignUp-Top-Title')}>회원가입 진행</div>
          <div className={cx('SignUp-Top-Description')}>
            회원가입을 위해서 옵션을 선택해주세요!
          </div>
        </div>
        <div className={cx('SignUp-Contents')}>
          <div className={cx('SignUp-Contents-Wrapper')}>
            <div className={cx('SignUp-Contents-Top')}>
              <img src={avatar} className={cx('SignUp-Contents-Top-Image')} alt='avatar' />

              <div className={cx('SignUp-Contents-Top-RightWrap')}>
                <div className={cx('SignUp-Contents-Top-RightWrap-NameWrap')}>
                  <div className={cx('SignUp-Contents-Top-RightWrap-NameWrap-Name')}>
                    이름: {name}
                  </div>

                  <div className={cx('SignUp-Contents-Top-RightWrap-NameWrap-GithubID')}>
                    ({githubId})
                  </div>
                </div>

                <div className={cx('SignUp-Contents-Top-RightWrap-InputWrap')}>
                  <InfoInput
                    value={descriptionState.description}
                    onChange={descriptionState.onChangeDescription}
                    placeholder='소개를 입력하세요.'
                    icon={<CgHello />}
                  />

                  <InfoInput
                    value={locationState.location}
                    onChange={locationState.onChangeLocation}  
                    placeholder='거주지 또는 직장을 입력하세요.'
                    icon={<BiBuilding />}
                  />

                  <InfoInput
                    value={blogState.blog}
                    onChange={blogState.onChangeBlog}
                    placeholder='개인 링크를 입력하세요.'
                    icon={<AiOutlineLink />}
                  />

                  <InfoInput
                    value={positionState.position}
                    onChange={positionState.onChangePosition}
                    placeholder='개발 포지션 (예: 프론트엔드 개발자)'
                    icon={<HiCode />}
                  />
                </div>
              </div>
            </div>

            <div className={cx('SignUp-Contents-Bottom')}>
              <Select
                style={selectStyle}
                defaultValue={1}
                onChange={generationState.onChangeGeneration}
              >
                {
                  generations.map((_: unknown, idx: number) => (
                    <Option
                      key={idx}
                      value={idx + 1}
                    >
                      {idx + 1}기
                    </Option>
                  ))
                }
              </Select>

              <Select
                defaultValue={majors[0].value}
                style={selectStyle}
                onChange={majorState.onChangeMajor}
              >
                {
                  majors.map(({ text, value }: IAuthOption, idx: number) => (
                    <Option key={idx} value={value}>{text}</Option>
                  ))
                }
              </Select>
            </div>
            
            <div className={cx('SignUp-Contents-Submit')}>
              <RegisterSubmit
                isLoading={isLoading}
                onClick={requestRegister}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
