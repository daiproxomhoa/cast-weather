import { Avatar, Button, Typography } from "@material-ui/core";
import { some } from "configs/utils";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { useStylesAvatar } from "./classes";
import ContentBox from "./ContentBox";
import { getNameAvatar } from "components/utils";
interface Props {
  data: some;
  onClick?: () => void;
}

const CommentCard = (props: Props) => {
  const { data, onClick } = props;
  const classes = useStylesAvatar();
  return (
    <>
      <div className="d-flex">
        <Avatar
          className={`${classes.root} ${
            classes[`avatar_${data?.user_id % 4}`]
          }`}
        >
          {getNameAvatar(data?.name)}
        </Avatar>
        <div>
          <ShowMoreText
            className="m-r-8 comment-box"
            lines={3}
            more="Show more"
            less="Show less"
            // expanded={false}
            anchorClass="color-white-grey"
          >
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </ShowMoreText>
          <div className="d-flex align-items-center m-t-8 m-b-8">
            <Button variant="text" onClick={onClick} style={{ padding: 2 }}>
              <Typography variant="subtitle2" color="inherit">
                Reply
              </Typography>
            </Button>
            &emsp;
            <Typography variant="subtitle2" color="inherit">
              {moment
                .duration(moment().diff(moment(data.createTime)))
                .asHours()
                .toFixed(2)}{" "}
              &nbsp;h
            </Typography>
          </div>
        </div>
      </div>
      <div className={"p-l-16"}>
        <ContentBox data={data} defaultHideInput={true} />
      </div>
    </>
  );
};
export default CommentCard;
