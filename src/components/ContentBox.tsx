import { Typography } from "@material-ui/core";
import { ContextStore } from "App";
import LoadingIcon from "common/LoadingIcon";
import { some } from "configs/utils";
import moment from "moment";
import React from "react";
import CommentCard from "./CommentCard";
import CommentFiled from "./CommentField";
import { appendData } from "./fakeData";
interface Props {
  data: some;
  defaultHideInput?: boolean;
}

const ContentBox = (props: Props) => {
  const { data, defaultHideInput = false } = props;
  const { comments = [], total } = data;
  const [commentsState, setComments] = React.useState<some[]>(comments);
  const [replyId, setReplyId] = React.useState(!defaultHideInput);
  const [loading, setLoading] = React.useState(false);
  const commentUnload = total - commentsState?.length;
  const { globalState, dispatch } = React.useContext(ContextStore);

  const getComments = React.useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setComments((one) => [
      ...one,
      ...Array(commentUnload > 10 ? 10 : commentUnload).fill(appendData),
    ]);
    setLoading(false);
  }, []);

  const sendComment = React.useCallback((message) => {
    setComments((one) => [
      ...one,
      {
        user_id: globalState.userData.user_id,
        content: message,
        createTime: moment().valueOf(),
        name: globalState.userData.name,
      },
    ]);
  }, []);

  return (
    <div>
      {commentsState?.map((value, index) => {
        return (
          <CommentCard
            key={index}
            data={value}
            onClick={() => {
              setReplyId(value.name);
            }}
          />
        );
      })}
      {commentUnload > 0 && (
        <div className="d-flex align-items-center  m-4 m-b-12">
          <Typography
            variant="subtitle2"
            className="show-more-reply"
            onClick={getComments}
          >
            View {commentUnload} more reply
          </Typography>
          {loading && (
            <LoadingIcon className="m-l-12" style={{ height: 14, width: 14 }} />
          )}
        </div>
      )}
      {replyId && (
        <CommentFiled
          className="m-b-24"
          onChange={sendComment}
        />
      )}
    </div>
  );
};

export default ContentBox;
