import { Modal } from "antd";

/**
 * 支持的类型
 */
type ConfirmModalType = "info" | "success" | "error" | "warning";

/**
 * 确认弹窗参数
 */
interface ConfirmModalOptions {
  type?: ConfirmModalType;
  title?: string;
  content: string | Node;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
}

/**
 * 通用确认弹窗（基于 antd Modal）
 */
export const useConfirmModal = ({
  type = "warning",
  title = "提示",
  content,
  okText = "确定",
  cancelText = "取消",
  onConfirm,
}: ConfirmModalOptions): void => {
  Modal[type]({
    title,
    content,
    okText,
    cancelText,
    onOk: async () => {
      if (onConfirm) {
        await onConfirm();
      }
    },
  });
};
