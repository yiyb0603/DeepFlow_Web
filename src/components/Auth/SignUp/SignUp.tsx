import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { CgHello } from 'react-icons/cg';
import { BiBuilding } from 'react-icons/bi';
import { AiOutlineLink, AiOutlineMail, AiOutlineGithub } from 'react-icons/ai';
import { HiCode } from 'react-icons/hi';
import { VscSymbolNamespace } from 'react-icons/vsc';
import useRegister from 'hooks/auth/useRegister';
import isEmpty from 'util/isEmpty';
import MajorSelect from 'components/Common/Select/MajorSelect';
import GenerationSelect from 'components/Common/Select/GenerationSelect';
import GithubLoading from 'components/Auth/GithubLoading';
import Helmet from 'components/Common/Helmet';
import InfoInput from '../../Common/Input/InfoInput';
import RegisterSubmit from '../RegisterSubmit';

const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SignUp = (): JSX.Element => {
  const {
    request,
    isLoading,
    onChangeRequest,
    requestRegister,
  } = useRegister();

  const {
    avatar,
    githubId,
    description,
    name,
    location,
    blog,
    email,
    position,
    generation,
    major,
  } = request;

  if (isEmpty(githubId)) {
    return <GithubLoading />;
  }

  return (
    <div className={cx('SignUp')}>
      <Helmet title='회원가입' />
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
                  <div className={cx('SignUp-Contents-Top-RightWrap-NameWrap-IdWrap')}>
                    <AiOutlineGithub className={cx('SignUp-Contents-Top-RightWrap-NameWrap-IdWrap-Icon')} />
                    <div className={cx('SignUp-Contents-Top-RightWrap-NameWrap-IdWrap-Id')}>{githubId}</div>
                  </div>
                </div>

                <div className={cx('SignUp-Contents-Top-RightWrap-InputWrap')}>
                  <InfoInput
                    name='name'
                    value={name}
                    onChange={onChangeRequest}
                    placeholder='이름을 입력하세요.'
                    icon={<VscSymbolNamespace />}
                  />

                  <InfoInput
                    name='email'
                    value={email}
                    onChange={onChangeRequest}
                    placeholder='이메일을 입력하세요.'
                    icon={<AiOutlineMail />}
                  />

                  <InfoInput
                    name='description'
                    value={description}
                    onChange={onChangeRequest}
                    placeholder='소개를 입력하세요.'
                    icon={<CgHello />}
                  />

                  <InfoInput
                    name='location'
                    value={location}
                    onChange={onChangeRequest}  
                    placeholder='거주지 또는 직장을 입력하세요.'
                    icon={<BiBuilding />}
                  />

                  <InfoInput
                    name='blog'
                    value={blog}
                    onChange={onChangeRequest}
                    placeholder='개인 링크를 입력하세요.'
                    icon={<AiOutlineLink />}
                  />

                  <InfoInput
                    name='position'
                    value={position}
                    onChange={onChangeRequest}
                    placeholder='개발 포지션 (예: 프론트엔드 개발자)'
                    icon={<HiCode />}
                  />
                </div>
              </div>
            </div>

            <div className={cx('SignUp-Contents-Bottom')}>
              <GenerationSelect
                generation={generation}
                onChangeGeneration={onChangeRequest}
              />

              <MajorSelect
                major={major}
                onChangeMajor={onChangeRequest}
              />
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
