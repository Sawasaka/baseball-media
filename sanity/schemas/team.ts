import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'チーム',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'チーム名',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'prefecture',
      title: '都道府県',
      type: 'string',
      options: {
        list: [
          { title: '大阪府', value: 'osaka' },
          { title: '兵庫県', value: 'hyogo' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'league',
      title: 'リーグ',
      type: 'string',
      options: {
        list: [
          { title: 'ボーイズリーグ', value: 'boys' },
          { title: 'シニアリーグ', value: 'senior' },
          { title: 'ヤングリーグ', value: 'young' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '紹介文',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: '公式URL',
      type: 'url',
    }),
  ],
})

