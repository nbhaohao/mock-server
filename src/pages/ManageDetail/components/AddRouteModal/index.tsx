import React, { useRef, useCallback } from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/es/modal";
import { AddRouteForm } from "./components/AddRouteForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { ProjectRoute, ProjectRouteMethod } from "@/services/projects";

type onSubmitFormType = (values: AddRouteFormValues) => void;

interface AddRouteModalProps extends ModalProps {
  onSubmitForm: onSubmitFormType;
  route: ProjectRoute;
}
interface AddRouteFormValues {
  name: string;
  method: ProjectRouteMethod;
  path: string;
  mockResponse: string;
}

const useAddRouteForm = ({
  onSubmitForm
}: {
  onSubmitForm: onSubmitFormType;
}) => {
  const formRef = useRef(null);
  const handleSubmitForm = useCallback(() => {
    const current = formRef.current;
    if (current === null) {
      return;
    }
    const formInstance = current as WrappedFormUtils;
    formInstance.validateFields((error, values) => {
      if (error) {
        return;
      }
      onSubmitForm(values);
    });
  }, [formRef, onSubmitForm]);
  return {
    formRef,
    handleSubmitForm
  };
};

const AddRouteModal: React.FC<AddRouteModalProps> = ({
  visible,
  onCancel,
  onSubmitForm,
  confirmLoading,
  route
}) => {
  const { formRef, handleSubmitForm } = useAddRouteForm({ onSubmitForm });
  return (
    <Modal
      width={800}
      title="添加路由"
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleSubmitForm}
      confirmLoading={confirmLoading}
    >
      <AddRouteForm ref={formRef} route={route} />
    </Modal>
  );
};

export { AddRouteModal };
