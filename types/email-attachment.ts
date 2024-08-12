export interface Attachment {
  filename: string;
  content: string;
  encoding?: string;
  type?: string;
  contentType?: string;
  disposition: string;
}
