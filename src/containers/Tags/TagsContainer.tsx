import useTagList from 'hooks/useTagList';
import Tags from 'components/Tags';

const TagsContainer = (): JSX.Element => {
  const { tagList } = useTagList();

  return (
    <Tags
      tagList={tagList}
    />
  );
}

export default TagsContainer;