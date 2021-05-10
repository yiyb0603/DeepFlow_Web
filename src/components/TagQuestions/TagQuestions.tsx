import { useEffect, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTag from 'hooks/tag/useTag';
import useViewMode from 'hooks/question/useViewMode';
import useTagQuestions from 'hooks/question/useTagQuestions';
import { EView } from 'lib/enum/theme';
import { historySingleton } from 'lib/singleton/history';
import { IQuestion } from 'types/question.types';
import PageLoading from 'components/Common/Loading/PageLoading';
import ListItem from 'components/Common/Post/ListItem';
import GridItem from 'components/Common/Post/GridItem';
import PageNumberList from 'components/Common/Post/PageNumberList';
import TagInfo from './TagInfo';

const style = require('./TagQuestions.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TagQuestions = (): JSX.Element => {
  const { pageParam, tagInfo } = useTag();
  const {
    tagQuestionList,
    requestPostsByTag,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedQuestionList,
    splitedNumberList,
  } = useTagQuestions();
  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();
  
  useEffect(() => {
    if (!pageParam.tag) {
      historySingleton.goBack();
    }

    requestPostsByTag();
  }, [requestPostsByTag, tagInfo, pageParam]);

  return (
    <>
    {
      tagInfo !== null ?
      <div className={cx('TagQuestions')}>
        <TagInfo
          tagInfo={tagInfo}
          count={tagQuestionList.length}
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />

        <div className={cx('TagQuestions-List')} style={flexStyle}>
          {
            splitedQuestionList[currentPage - 1] &&
            splitedQuestionList[currentPage - 1].map((tagQuestoin: IQuestion) => (
              <>
              {
                viewMode === EView.LIST ?
                <ListItem
                  key={tagQuestoin.idx}
                  {...tagQuestoin}
                /> :
                <GridItem
                  key={tagQuestoin.idx}
                  {...tagQuestoin}
                />
              }
              </>
            ))
          }
        </div>

        <PageNumberList
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
          numberListPage={numberListPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pageList={splitedNumberList}
        />
      </div> : <PageLoading text={'태그 글 목록을 불러오는 중입니다.'} />
    }
    </>
  );
};

export default memo(TagQuestions);