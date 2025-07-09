import { UniqueId } from './value-objects/unique-id';

export type OptionalProps = Partial<{
  id: string;
  createdAt: Date;
  updatedAt: Date;
}>;
export class CoreEntity<T> {
  private _id: UniqueId;
  private _createdAt: Date;
  private _updatedAt: Date;

  protected props: T;
  protected constructor(props: T, optional: OptionalProps = {}) {
    const { id, createdAt, updatedAt } = optional;
    this.props = props;
    this._id = new UniqueId(id);
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }
  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
