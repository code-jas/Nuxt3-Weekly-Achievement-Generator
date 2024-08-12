<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import * as z from 'zod';
  import { reactive, ref, watch } from 'vue';

  import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';
  import { useUserStore } from '~/stores/useUserStore';

  import type { ApiResponse } from '~/types/api';
  import type { User } from '~/types/user';

  import { Button } from '@/components/ui/button';
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import { useToast } from '@/components/ui/toast/use-toast';

  const { toast } = useToast();
  const timeEntriesStore = useTimeEntriesStore();
  const userStore = useUserStore();
  const registerOpen = ref<boolean>(false);

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().trim().min(1, { message: 'Name is required' }),
      jobPosition: z.string().trim().min(1, { message: 'Job position is required' }),
      clockifyUserId: z.string().trim().min(1, { message: 'Clockify User ID is required' }),
    }),
  );

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit(async (values: User) => {
    console.log('Form values:', values);

    try {
      const response = await $fetch<ApiResponse>('/api/v1/user/register', {
        method: 'POST',
        body: { userData: JSON.stringify(values) },
      });

      // console.log('response :>> ', response);

      if (response.success) {
        toast({
          title: 'Success',
          description: 'User data has been securely stored.',
        });
        registerOpen.value = false;
        userStore.fetchUserData();
      } else {
        throw new Error(response.message || 'Failed to store user data');
      }
    } catch (error: any) {
      console.error(error.message);
      toast({
        title: 'Error',
        description: error.message || 'Failed to store user data',
      });
    }
  });

  watch(
    () => timeEntriesStore.error,
    (newError: any) => {
      if (newError && newError.description && newError.description == 'No user data found.') {
        registerOpen.value = true;
      } else {
        registerOpen.value = false;
      }
    },
  );
</script>

<template>
  <Dialog v-model:open="registerOpen">
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ userStore.userInvalid ? 'Register' : 'Update Details' }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> {{ userStore.userInvalid ? 'Register' : 'Update ' }} User</DialogTitle>
        <DialogDescription>
          Enter your basic information as displayed in the generated report. Your data is not saved
          for privacy reasons.
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="John Doe" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              The name that will be displayed in the generated report.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="jobPosition">
          <FormItem v-auto-animate>
            <FormLabel>Job Position</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Full Stack Developer" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              The job position to be shown in the generated report.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="clockifyUserId">
          <FormItem v-auto-animate>
            <FormLabel>Clockify User ID</FormLabel>
            <FormControl>
              <Input type="text" placeholder="1g2suDS21nds8s243nkjdr3" v-bind="componentField" />
            </FormControl>
            <FormDescription> The unique user ID in the Clockify workspace. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter as="div" class="mt-4">
          <DialogClose as-child>
            <Button type="button" variant="secondary"> Cancel </Button>
          </DialogClose>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
