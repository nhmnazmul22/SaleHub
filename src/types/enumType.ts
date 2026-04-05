export enum RoleEnumType {
    ADMIN = "admin",
    BRANCH_MANAGER = "branch_manager",
    STAFF = "staff",
}

export enum VatDiscountEnumType {
    PERCENT = "percent",
    FIXED = "fixed",
}

export enum PurchaseStatusEnum {
    ORDERED = "ordered",
    PARTIAL = "partial",
    RECEIVED = "received"
}

export enum AdjustmentEnumType {
    PURCHASE = "PURCHASE",
    ADJUST_IN = "ADJUST_IN",
    ADJUST_OUT = "ADJUST_OUT",
    TRANSFER_IN = "TRANSFER_IN",
    TRANSFER_OUT = "TRANSFER_OUT",
}


export enum SaleStatusEnumType {
    DRAFT = "draft",
    COMPLETED = "completed",
    RETURNED = "returned",
    CANCEL = "cancel",
}

export enum PaymentMethodEnumType {
    CASH = "cash",
    BANK = "bank",
    ONLINE_BANKING = "online_banking",
}

export enum PaymentStatusEnumType {
    PARTIAL = "partial",
    PAID = "paid",
    PENDING = "pending",
    CANCELLED = "cancelled",
}
